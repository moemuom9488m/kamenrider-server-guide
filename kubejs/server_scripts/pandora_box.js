// Pandora Box progression, see startup_scripts/pandora_box.js
//
// Each region (Touto / Hokuto / Seito) owns 10 Best Match pairs = 20 Fullbottles (same sets as the
// item tags kamenridercraft:gear/fullbottles/<region>). A panel has 2 rows x 5 slots and holds 5 pairs:
// the bottle above must be the Best Match of the bottle below.
//   panel I  = pairs 1-5  (Fullbottles 1-10 of the region)
//   panel II = pairs 6-10 (Fullbottles 11-20 of the region)
// The panel GUI itself refuses wrong bottles (patched KRC); these checks are the backstop for crafting.

const SLOTS = 10 // a Pandora Panel holds 10 Fullbottles, slots 0-4 on top, 5-9 below
const PAIRS_PER_PANEL = 5

const DataComponents = Java.loadClass('net.minecraft.core.component.DataComponents')
const BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
// the container the panel GUI uses: it reads the panel's stored bottles into slots for us
const BasicContainer = Java.loadClass('com.kelco.kamenridercraft.item.base_items.component.BasicContainer')

const REGIONS = ['touto', 'hokuto', 'seito']

const PAIRS = {
  touto: [
    ['rabbit', 'tank'], ['gorilla', 'diamond'], ['taka', 'gatling'], ['harinezumi', 'shoubousha'], ['ninja', 'comic'],
    ['panda', 'rocket'], ['lion', 'soujiki'], ['dragon', 'lock'], ['kaizoku', 'densha'], ['octopus', 'light']
  ],
  hokuto: [
    ['phoenix', 'robot'], ['wolf', 'smapho'], ['unicorn', 'keshigomu'], ['rose', 'helicopter'], ['turtle', 'watch'],
    ['kuma', 'televi'], ['kabutomushi', 'camera'], ['spider', 'reizouko'], ['dog', 'mic'], ['santa_claus', 'cake']
  ],
  seito: [
    ['tora', 'ufo'], ['kujira', 'jet'], ['shika', 'pyramid'], ['kirin', 'senpuuki'], ['penguin', 'skebo'],
    ['same', 'bike'], ['hachi', 'sensuikan'], ['sai', 'dryer'], ['bat', 'engine'], ['obake', 'magnet']
  ]
}

function bottleId(name) {
  return 'kamenridercraft:' + name + '_full_bottle'
}

// PAIR_INDEX[region][bottle id] = index (0-9) of the Best Match pair that bottle belongs to
const PAIR_INDEX = {}
REGIONS.forEach(function (r) {
  PAIR_INDEX[r] = {}
  PAIRS[r].forEach(function (p, i) {
    PAIR_INDEX[r][bottleId(p[0])] = i
    PAIR_INDEX[r][bottleId(p[1])] = i
  })
})

// stack.id gave the same id for every stack here, so ask the item registry directly
function idOf(stack) {
  return String(BuiltInRegistries.ITEM.getKey(stack.getItem()))
}

// "kamenridercraft:pandora_panel_touto" -> { region: 'touto', half: 0 }
// "kubejs:complete_pandora_panel_touto_2" -> { region: 'touto', half: 2 }
function panelInfo(stack) {
  const m = /pandora_panel_(touto|hokuto|seito)(?:_([12]))?$/.exec(idOf(stack))
  return m ? { region: m[1], half: m[2] ? Number(m[2]) : 0 } : null
}

// bottle id per panel slot (null = empty), in slot order like the panel GUI
function slotIds(stack) {
  const out = []
  if (!stack.get(DataComponents.CONTAINER)) return out
  const box = new BasicContainer(stack, SLOTS)
  for (let i = 0; i < SLOTS; i++) {
    // var, not const: this Rhino keeps the first value of a const declared inside a loop
    var s = box.getItem(i)
    out.push(s.isEmpty() ? null : idOf(s))
  }
  return out
}

function gridStacks(grid) {
  const out = []
  for (let i = 0; i < grid.size(); i++) {
    var s = grid.getItem(i)
    if (!s.isEmpty()) out.push(s)
  }
  return out
}

// 1 = panel I (pairs 1-5), 2 = panel II (pairs 6-10), 0 = not a valid panel:
// every slot filled, each top slot (0-4) is the Best Match of the slot below it (5-9),
// all five pairs different and all from the same half of the region
function panelHalf(region, ids) {
  if (ids.length < SLOTS) return 0
  const used = {}
  let half = 0
  for (let i = 0; i < SLOTS / 2; i++) {
    // var, not const: this Rhino keeps the first value of a const declared inside a loop
    var top = ids[i]
    var bottom = ids[i + SLOTS / 2]
    if (!top || !bottom) return 0
    var pair = PAIR_INDEX[region][top]
    if (pair === undefined || pair !== PAIR_INDEX[region][bottom] || top === bottom) return 0
    if (used[pair]) return 0
    used[pair] = true
    var h = pair < PAIRS_PER_PANEL ? 1 : 2
    if (half !== 0 && half !== h) return 0
    half = h
  }
  return half
}

ServerEvents.recipes(event => {
  // the guide book "騎士變身攻略" (patchouli_books/kr_route): book + redstone
  event.shapeless('patchouli:guide_book[patchouli:book="patchouli:kr_route"]', [
    'minecraft:book',
    'minecraft:redstone'
  ]).id('kubejs:kr_route_guide_book')

  // 0) panels can be crafted: 8 empty bottles around the mineral of the region (matches the panel colour)
  const PANEL_MINERAL = {
    touto: 'minecraft:emerald',
    hokuto: 'minecraft:diamond',
    seito: 'minecraft:redstone'
  }
  REGIONS.forEach(region => {
    event.shaped('kamenridercraft:pandora_panel_' + region, [
      'BBB',
      'BMB',
      'BBB'
    ], {
      B: 'kamenridercraft:full_bottle',
      M: PANEL_MINERAL[region]
    }).id('kubejs:craft_pandora_panel_' + region)
  })

  // 1) a panel holding 5 Best Match pairs of its own region becomes completed panel I or II
  //    (the result item is picked in modifyResult; the one registered here is only a placeholder)
  REGIONS.forEach(region => {
    event.shapeless('kubejs:complete_pandora_panel_' + region + '_1', ['kamenridercraft:pandora_panel_' + region])
      .modifyResult('pandora_panel_complete')
      .id('kubejs:complete_pandora_panel_' + region)
  })

  // 1b) a completed panel can be turned back into the original panel with all its bottles
  REGIONS.forEach(region => {
    ;[1, 2].forEach(half => {
      event.shapeless('kamenridercraft:pandora_panel_' + region, ['kubejs:complete_pandora_panel_' + region + '_' + half])
        .modifyResult('pandora_panel_revert')
        .id('kubejs:revert_pandora_panel_' + region + '_' + half)
    })
  })

  // 2) completed panels I and II of every region -> opened Pandora Box
  const done = (r, h) => 'kubejs:complete_pandora_panel_' + r + '_' + h
  event.shapeless('kubejs:opened_pandora_box', [
    done('touto', 1), done('touto', 2),
    done('hokuto', 1), done('hokuto', 2),
    done('seito', 1), done('seito', 2)
  ])
    .modifyResult('pandora_box_assemble')
    .id('kubejs:opened_pandora_box')

  // 3) opened Pandora Box + circuits -> Genius Fullbottle (the boss drop route still works too)
  event.shaped('kamenridercraft:genius_full_bottle', [
    'XXX',
    'XBX',
    'XXX'
  ], {
    X: 'kamenridercraft:rider_circuit',
    B: 'kubejs:opened_pandora_box'
  }).id('kubejs:genius_full_bottle_from_box')
})

ServerEvents.modifyRecipeResult('pandora_panel_complete', event => {
  const stacks = gridStacks(event.grid)
  if (stacks.length !== 1) return event.success(Item.empty)

  const info = panelInfo(stacks[0])
  if (!info) return event.success(Item.empty)

  const ids = slotIds(stacks[0])
  const half = panelHalf(info.region, ids)
  if (half === 0) return event.success(Item.empty)

  // keep the bottles inside the completed panel
  const result = Item.of('kubejs:complete_pandora_panel_' + info.region + '_' + half)
  result.set(DataComponents.CONTAINER, stacks[0].get(DataComponents.CONTAINER))
  return event.success(result)
})

// reverting hands back the original panel holding exactly the bottles of the completed one
ServerEvents.modifyRecipeResult('pandora_panel_revert', event => {
  const stacks = gridStacks(event.grid)
  if (stacks.length !== 1) return event.success(Item.empty)

  const result = event.item.copy()
  const contents = stacks[0].get(DataComponents.CONTAINER)
  if (contents) result.set(DataComponents.CONTAINER, contents)
  return event.success(result)
})

// every completed panel must really hold the bottles of its own kind (I or II)
ServerEvents.modifyRecipeResult('pandora_box_assemble', event => {
  let ok = true
  gridStacks(event.grid).forEach(s => {
    const info = panelInfo(s)
    const good = info !== null && info.half !== 0 && panelHalf(info.region, slotIds(s)) === info.half
    if (!good) ok = false
  })
  return event.success(ok ? event.item : Item.empty)
})

// Golden Bangle on a Pandora Box: refills the 60 bottles at once and opens it (bangle is used up)
BlockEvents.rightClicked('kamenridercraft:pandora_box', event => {
  if (event.hand != 'main_hand') return
  if (event.item.id != 'kamenridercraft:golden_bangle') return

  event.block.set('kubejs:opened_pandora_box')
  if (!event.player.isCreative()) event.item.shrink(1)
  event.player.tell('金手鐲補回了 60 瓶滿裝瓶，潘朵拉魔盒已經打開！')
  event.cancel()
})

// Completed panels can be hung on a wall like the original Pandora Panel: right-click a wall and the item goes into
// Kamen Rider Craft's wall panel block. Its block entity keeps the stack (bottles included) and its renderer draws the
// item, breaking the block drops the very same stack again. (The patched KRC also makes the block report the hung
// panel as its item, so block info overlays and pick block show the real panel.)
const WallPanelBlock = Java.loadClass('com.kelco.kamenridercraft.block.storage.PandoraPanelBlock')
const ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const SoundEvents = Java.loadClass('net.minecraft.sounds.SoundEvents')
const SoundSource = Java.loadClass('net.minecraft.sounds.SoundSource')
const HORIZONTAL_FACES = { north: true, south: true, east: true, west: true }

BlockEvents.rightClicked(event => {
  if (event.hand != 'main_hand') return
  const held = event.item
  if (held.isEmpty() || idOf(held).indexOf('kubejs:complete_pandora_panel_') !== 0) return
  const face = event.facing
  if (!HORIZONTAL_FACES[String(face)]) return

  const level = event.level
  const pos = event.block.pos.relative(face)
  const block = BuiltInRegistries.BLOCK.get(ResourceLocation.parse('kamenridercraft:pandora_panel_block'))
  const state = block.defaultBlockState().setValue(WallPanelBlock.FACING, face)
  if (!level.getBlockState(pos).canBeReplaced() || !state.canSurvive(level, pos)) return

  level.setBlock(pos, state, 3)
  const be = level.getBlockEntity(pos)
  if (be == null) {
    level.removeBlock(pos, false)
    return
  }
  be.inventory.setStackInSlot(0, held.copyWithCount(1))
  if (!event.player.isCreative()) held.shrink(1)
  event.player.playNotifySound(SoundEvents.ITEM_FRAME_ADD_ITEM, SoundSource.BLOCKS, 1.0, 1.0)
  event.cancel()
})

// Pandora Box progression (closer to Kamen Rider Build):
//   a regional panel filled with 5 Best Match pairs becomes a completed panel:
//     I  = Fullbottles 1-10 of the region, II = Fullbottles 11-20
//   the 6 completed panels (Touto/Hokuto/Seito x I/II) -> opened Pandora Box -> Genius Fullbottle
// Recipes and checks live in server_scripts/pandora_box.js

StartupEvents.registry('item', event => {
  // region -> texture of the matching Pandora Panel (Touto teal, Hokuto blue, Seito red)
  const panels = {
    touto: { name: '東都', texture: 'kamenridercraft:item/pandora_panel_green' },
    hokuto: { name: '北都', texture: 'kamenridercraft:item/pandora_panel_blue' },
    seito: { name: '西都', texture: 'kamenridercraft:item/pandora_panel_red' }
  }
  const numerals = { 1: 'I', 2: 'II' }

  Object.keys(panels).forEach(region => {
    ;[1, 2].forEach(half => {
      event.create('complete_pandora_panel_' + region + '_' + half)
        .displayName('完成的潘朵拉面板（' + panels[region].name + ' ' + numerals[half] + '）')
        // drawn texture: the panel frame of the region with its 10 Fullbottles in the middle
        .texture('kubejs:item/complete_pandora_panel_' + region + '_' + half)
        .maxStackSize(1)
        .glow(true)
    })
  })
})

// show the new items in Kamen Rider Craft's Build creative tab
StartupEvents.modifyCreativeTab('kamenridercraft:krc_390_build_tab', event => {
  event.add([
    'kubejs:complete_pandora_panel_touto_1',
    'kubejs:complete_pandora_panel_touto_2',
    'kubejs:complete_pandora_panel_hokuto_1',
    'kubejs:complete_pandora_panel_hokuto_2',
    'kubejs:complete_pandora_panel_seito_1',
    'kubejs:complete_pandora_panel_seito_2',
    'kubejs:opened_pandora_box'
  ])
})

StartupEvents.registry('block', event => {
  const box = event.create('opened_pandora_box')
    .displayName('已打開的潘朵拉魔盒')
    .hardness(3)
    .resistance(6)
    .soundType('metal')
    .lightLevel(0.6)
    // like an ender chest: drops itself with Silk Touch and falls apart into the six completed panels
    // otherwise (loot table: kubejs/data/kubejs/loot_table/blocks/opened_pandora_box.json).
    // No requiresTool: bare hands drop the panels too, a pickaxe is just faster (mineable/pickaxe tag).
    .tagBlock('minecraft:mineable/pickaxe')

  // this KubeJS version has no textureAll(): set every face (and the break particle) by hand
  // the box is made of the six completed panels, one per face (Touto I/II, Hokuto I/II, Seito I/II)
  ;['up', 'down', 'north', 'south', 'east', 'west'].forEach(face => {
    box.texture(face, 'kubejs:block/opened_pandora_box_' + face)
  })
  box.texture('particle', 'kubejs:block/opened_pandora_box_east')
})

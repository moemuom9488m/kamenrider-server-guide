# 假面騎士模組包（Minecraft 1.21.1 + NeoForge）

Minecraft **Java 版 1.21.1** + **NeoForge 21.1.262** 的假面騎士生存模組包，內含主模組 Kamen Rider Craft 與周邊模組，以及上傳者自製的部分模組與設定。

---

## ⚠️ 版權與使用聲明

- 本模組包內的 **Kamen Rider Craft** 及其他第三方模組，**原作者不是上傳者**。
- 假面騎士相關的角色、名稱、影像、音樂、音效與商標，歸原權利人所有。
- 上傳者只負責整理與打包，**不擁有上述第三方內容的著作權**。
- 本模組包 **僅供模組遊玩與下載使用**，請勿用於商業用途或作其他用途。
- 如原權利人或模組作者認為本內容有問題，請透過 GitHub 與上傳者聯絡。
- **本包內的 `kamenridercraft-1.1.4.jar` 是上傳者修改過的版本，不是原作者發布的原版。** 修改只涉及「潘朵拉魔盒路線」的面板功能（詳見下方【自製】），其餘內容維持原樣。修改版的問題請找上傳者，**不要**去煩原作者。原版 jar 仍保存在本倉庫的歷史提交 `bb7a8ef` 中，也可以自行到原作者的發布頁取得。

只有下方標示為 **【自製】** 或 **【修改版】** 的部分，才是上傳者自己做或改的。

---

## 📦 內容

| 資料夾 | 說明 |
|---|---|
| `mods/` | 模組 jar 檔（共 31 個） |
| `config/` | 模組設定檔（不含伺服器位址與備份檔） |
| `kubejs/` | 【自製】潘朵拉魔盒路線的 KubeJS 腳本、掉落表與貼圖 |
| `patchouli_books/` | Patchouli 手冊資料（【自製】騎士變身攻略） |

### 【自製】與【修改版】

| 檔案 | 說明 |
|---|---|
| `controlify_radial_icons-1.0.0.jar` | 為 Controlify 手把輪盤加上物品圖示（mixin 實作） |
| `rider_henshin_sounds-1.0.0.jar` | 依變身道具與腰帶播放變身音效（僅客戶端） |
| `patchouli_books/kr_route/` | 騎士變身攻略手冊（Patchouli 書） |
| `config/rider_henshin_sounds/*.ogg` | 變身音效檔，目前為 Windows TTS 製作的 **占位音** |
| `kubejs/` | 潘朵拉魔盒路線：完成面板 I/II、已打開的潘朵拉魔盒、相關配方、魔盒掉落表、掛牆展示、手繪貼圖（見下方說明） |
| 【修改版】`mods/kamenridercraft-1.1.4.jar` | 在原版 Kamen Rider Craft 1.1.4 上修改了 3 處（見下方） |

**修改版 KRC 改了什麼**（原版 SHA-256 開頭 `0ecbdaa3…`，修改版開頭 `7b95a085…`）

1. 東都／北都／西都潘朵拉面板的 10 個格子改為**放入當下就檢查**：只能放該地區的滿裝瓶、上排與下排必須是同一組 Best Match、同一片面板只能全是第 I 組或全是第 II 組、同一組不能放進兩欄。其他面板（白、黑）規則不變。
2. 修正面板介面在客戶端被固定當成東都面板的問題（改為讀取實際手上或方塊裡的面板）。
3. 牆上的面板方塊改為回報「掛著的那一片面板」當作自己的物品，讓 Jade 等方塊資訊與創造模式的中鍵挑選顯示正確的面板，而不是通用圖示。

### 潘朵拉魔盒路線（【自製】玩法）

- 東都、北都、西都各有 20 瓶滿裝瓶，每個地區 2 片面板（I 與 II），每片放 5 組 Best Match。
- 面板放滿後可合成為「完成的潘朵拉面板」（6 種）；6 種集齊後組成「已打開的潘朵拉魔盒」；魔盒加 8 個騎士迴路可合成天才滿裝瓶。
- 面板合成：8 個空滿裝瓶圍住一個礦物（東都＝綠寶石、北都＝鑽石、西都＝紅石）。完成面板可以再合成回原本的面板，瓶子不會消失。
- 魔盒放在地上後，用絲綢之觸挖會掉魔盒本身，否則散成 6 片完成面板；空手也可以挖，鎬子比較快。
- 完成面板可以對**牆面**按右鍵掛起來展示，挖掉會掉回同一片。
- 金手鐲對 KRC 的潘朵拉魔盒按右鍵，會直接變成已打開的魔盒。
- 手冊合成：書加紅石，得到「騎士變身攻略」。

### 第三方模組（原作者非上傳者）

| 模組 | 版本 |
|---|---|
| Kamen Rider Craft | 1.1.4（本包為【修改版】，見上方） |
| KubeJS | 2101.7.2-build.377 |
| Rhino | 2101.2.7-build.85 |
| Better Third Person | 1.9.0 |
| Inventory Profiles Next | 2.2.5 |
| Jade | 15.10.6 |
| Just Enough Resources | 1.6.0.17 |
| Mouse Tweaks | 2.26.1 |
| Patchouli | 1.21.1-93 |
| Player Animation Lib（NeoForge 版與 forge 版） | 1.1.6 / 2.0.4 |
| AppleSkin | 3.0.9 |
| Camera Utils | 0.4.7 |
| Controlify | 3.0.1+lts |
| Entity Culling | 1.11.3 |
| FerriteCore | 7.0.3 |
| Freecam | 1.3.0 |
| GeckoLib | 4.9.3 |
| Inventory HUD | 3.4.28 |
| JEI | 19.64.0.454 |
| Kotlin for Forge | 5.12.0 |
| libIPN | 6.6.3 |
| Lithium | 0.15.4 |
| ModernFix | 5.27.26 |
| ReforgedPlay Fix | 0.3.2 |
| Sodium | 0.8.13 |
| Xaero's Minimap | 26.6.0 |
| Xaero's World Map | 1.47.0 |
| Yet Another Config Lib | 3.8.2 |

各模組的原作者與授權，請到其 Modrinth 或 CurseForge 頁面查看。

---

## 🛠 安裝方式

1. 安裝 **NeoForge 1.21.1（21.1.262）**，可用官方 Launcher、Prism Launcher 或 CurseForge App 建立實例，載入器選 NeoForge，不要選 Forge、Fabric 或 Quilt。
2. 把 `mods/` 裡的所有 jar 放進實例的 `mods/` 資料夾。
3. 把 `config/` 複製到實例的 `config/` 資料夾（若已存在同名檔案，請先備份）。
4. 把 `patchouli_books/` 複製到實例資料夾根目錄。
5. 把 `kubejs/` 複製到實例資料夾根目錄（沒有它，完成面板與魔盒會是紫黑格，也看不到相關配方）。
6. 啟動遊戲。

> 連線到伺服器時，客戶端的 `kamenridercraft-1.1.4.jar`、KubeJS、Rhino 與 `kubejs/startup_scripts/` 必須和伺服器一致，否則格子規則、物品註冊會對不上。

> 本模組包只支援 Java 版，不支援基岩版。

# 假面騎士模組包（Minecraft 1.21.1 + NeoForge）

Minecraft **Java 版 1.21.1** + **NeoForge 21.1.262** 的假面騎士生存模組包，內含主模組 Kamen Rider Craft 與周邊模組，以及上傳者自製的部分模組與設定。

---

## ⚠️ 版權與使用聲明

- 本模組包內的 **Kamen Rider Craft** 及其他第三方模組，**原作者不是上傳者**。
- 假面騎士相關的角色、名稱、影像、音樂、音效與商標，歸原權利人所有。
- 上傳者只負責整理與打包，**不擁有上述第三方內容的著作權**。
- 本模組包 **僅供模組遊玩與下載使用**，請勿用於商業用途或作其他用途。
- 如原權利人或模組作者認為本內容有問題，請透過 GitHub 與上傳者聯絡。

只有下方標示為 **【自製】** 的部分，才是上傳者自己做的。

---

## 📦 內容

| 資料夾 | 說明 |
|---|---|
| `mods/` | 模組 jar 檔（共 29 個） |
| `config/` | 模組設定檔（不含伺服器位址與備份檔） |
| `patchouli_books/` | Patchouli 手冊資料（【自製】騎士變身攻略） |

### 【自製】模組

| 檔案 | 說明 |
|---|---|
| `controlify_radial_icons-1.0.0.jar` | 為 Controlify 手把輪盤加上物品圖示（mixin 實作） |
| `rider_henshin_sounds-1.0.0.jar` | 依變身道具與腰帶播放變身音效（僅客戶端） |
| `patchouli_books/kr_route/` | 騎士變身攻略手冊（Patchouli 書） |
| `config/rider_henshin_sounds/*.ogg` | 變身音效檔，目前為 Windows TTS 製作的 **占位音** |

### 第三方模組（原作者非上傳者）

| 模組 | 版本 |
|---|---|
| Kamen Rider Craft | 1.1.4 |
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
5. 啟動遊戲。

> 本模組包只支援 Java 版，不支援基岩版。

# 假面騎士模組生存伺服器・進入須知

Minecraft **Java 版 1.21.1** + **NeoForge** + **Kamen Rider Craft** 的私人生存伺服器（最多 4 人）。

> 📖 網頁版：<https://moemuom9488m.github.io/kamenrider-server-guide/>
>
> 📊 伺服器狀態：<https://moemuom9488m.github.io/kamenrider-server-guide/status.html>
>
> 伺服器位址不公開，請直接向服主索取。

---

## 0. 先確認你能不能玩

| 項目 | 需求 |
|---|---|
| 遊戲版本 | **Minecraft Java 版**（Windows / Mac / Linux） |
| 基岩版（手機、Switch、PS、Xbox、Win10/11 基岩版） | **不能玩**。模組只支援 Java 版 |
| 帳號 | 正版 Microsoft 帳號（伺服器有開正版驗證） |
| 電腦 | 建議記憶體 8GB 以上，遊戲分配 4GB 左右 |

---

## 1. 安裝 NeoForge 1.21.1

1. 用官方 Minecraft Launcher 先啟動一次原版 **1.21.1**，確認能進遊戲。
2. 到 NeoForge 官網 <https://neoforged.net/> 下載 **1.21.1** 的 installer（建議與伺服器相同的 **21.1.262**），執行後選 **Install client**。
3. Launcher 會多出一個 NeoForge 1.21.1 的設定檔，之後都用它開遊戲。

> 用 Prism Launcher 或 CurseForge App 的話，建立實例時選 Minecraft **1.21.1**、載入器選 **NeoForge** 即可。不要選 Forge、Fabric 或 Quilt。

---

## 2. 放入必備模組（4 個都要裝）

版本請跟伺服器一樣。全部從 **Modrinth 官方頁面**下載，篩選 **NeoForge** 與 **1.21.1**。

| 模組 | 版本 | 用途 | 下載 |
|---|---|---|---|
| Kamen Rider Craft | 1.1.4 | 主模組 | [Modrinth](https://modrinth.com/mod/kamen-rider-craft/versions?l=neoforge&g=1.21.1) |
| GeckoLib | 4.9.3 | 前置（模型與動畫） | [Modrinth](https://modrinth.com/mod/geckolib/versions?l=neoforge&g=1.21.1) |
| Player Animation Library | 1.1.6 | 前置（變身動作） | [Modrinth](https://modrinth.com/mod/player-animation-library/versions?l=neoforge&g=1.21.1) |
| Patchouli | 1.21.1-93 | 遊戲內指南書 | [Modrinth](https://modrinth.com/mod/patchouli/versions?l=neoforge&g=1.21.1) |

模組 `.jar` 檔放的位置：

- **官方 Minecraft Launcher**：`.minecraft/mods/`
  - Windows：`%appdata%\.minecraft\mods`
  - Mac：`~/Library/Application Support/minecraft/mods`
- **Prism Launcher / MultiMC**：該實例的 `mods/` 資料夾（實例上按右鍵 → 開啟資料夾）
- **CurseForge App**：該 Custom Profile 的 `mods/` 資料夾（Profile → … → Open Folder）

> 伺服器另外裝了 Lithium、FerriteCore、ModernFix、Chunky、spark，這些只在伺服器上運作，**玩家不用裝**。
>
> 請不要下載來路不明的整合包或「破解版」模組。

---

## 3. 連線方式

伺服器透過 **Tailscale** 連線，不對外公開。

1. 到 <https://tailscale.com/download> 安裝 Tailscale 並登入。
2. 把你登入 Tailscale 的帳號告訴服主，等服主把你加入或分享伺服器給你。
3. 開著 Tailscale，在 Minecraft「多人遊戲 → 新增伺服器」輸入**服主給你的位址**。

> 跟伺服器在同一個 Wi-Fi 的人，服主會另外給你區網位址。

---

## 4. 進服之後

- **繁體中文翻譯**：第一次進服會跳出「套用假面騎士模組繁體中文翻譯？」，按 **是** 就會自動下載並套用（需要開著 Tailscale）。接著到「選項 → 語言」選 **繁體中文（台灣）**。
- **指南書**：第一次進服會自動拿到一本 Kamen Rider Craft 指南書，有各騎士的取得與變身方式（內容是英文）。弄丟了可以用 **3 張紙 + 1 個皮革 + 1 個騎士電路板** 無序合成。
- **時間暫停**：伺服器連續 5 分鐘沒人在線時，日夜、天氣和作物生長會暫停；有人進來就恢復。

---

## 5. 連不上時看這裡

| 錯誤訊息 | 意思 | 怎麼處理 |
|---|---|---|
| missing mods | 少裝了伺服器有的模組 | 把訊息列出的模組（照上表版本）放進 `mods/` |
| extra mods | 多裝了伺服器沒有、又需要兩邊都有的模組 | 先把列出的模組移出 `mods/` 再連 |
| version mismatch / channel version mismatch | 模組版本跟伺服器不同 | 換成跟上表一樣的版本 |
| not running NeoForge | 用的是原版、Forge 或 Fabric | 改用 NeoForge 1.21.1 的設定檔開遊戲 |
| Incompatible mod set | 整體模組組合對不上 | 先只留 4 個必備模組測試，能連上後再一個一個加回其他模組 |
| 連線逾時 / Connection timed out | 連不到伺服器 | 確認 Tailscale 有開、有登入、服主已經把你加進來 |

裝了 Sodium、Iris、小地圖、JEI 等模組後連不上的話，先把它暫時移出 `mods/` 試一次，確定是它造成的再換成支援 NeoForge 1.21.1 的版本。

---

## 6. 還是不行，請提供這三樣給服主

1. 完整的錯誤畫面截圖
2. 你的 `mods/` 資料夾裡所有檔案的清單
3. 最新的用戶端 log：`.minecraft/logs/latest.log`（Prism / CurseForge 在該實例的 `logs/`）

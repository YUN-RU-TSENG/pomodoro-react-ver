# pomodoro-todo
> react-ver

![截圖 2023-01-10 下午7 59 00](https://user-images.githubusercontent.com/41847720/211546054-9df40576-c0ee-4383-8ef7-54d8cf816b8d.png)
![截圖 2023-01-10 下午7 57 59](https://user-images.githubusercontent.com/41847720/211545843-95502345-b9a2-4cdb-b5d9-bf7667bb7b6a.png)

## 使用技術

- React(hook)
- React Router
- Redux(Redux toolkit)
- component 皆為手刻，無額外使用 UI library
- styled-components
- dayjs

## Quick Start

```
npm i
npm run dev
```

## 功能

### 主要目標

-   [x] 用戶登入登出註冊
-   [x] 用戶讀取、新增、刪除、修改 Task 項目
-   [x] 番茄鐘功能
    -   [x] 番茄鐘能夠依照用戶設置設置自動接續倒數
    -   [x] 番茄鐘可以在倒數時縮小，用戶可以繼續其他操作行為
    -   [x] 若是正在執行番茄計時的任務遭到刪除，番茄鐘會立刻中止
-   [ ] 用戶可以修改用戶番茄鐘設置，包含：番茄工作時長、休息時長、長休息時長、長休息間隔

### 次要目標

-   [ ] 番茄鐘使用習慣圖表
    -   [ ] 用戶可以影印番茄鐘圖表
-   [ ] 用戶可以設置番茄鐘倒數警示聲
-   [ ] 用戶可以設置頭像
-   [ ] E2E 測試
-   [ ] Unit test

該專案有 Vue3 版本，見 >>> [用 Vue + Firebase 打造 Pomodoro | RU Tseng](https://yun-ru-tseng.github.io/posts/make-a-pomodoro/)

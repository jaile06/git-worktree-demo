// FAQ 資料層 — 與 Git Worktree 主題相關的常見問答
export const faqData = [
    {
        id: 1,
        question: 'Git Worktree 是什麼？跟一般分支切換有什麼不同？',
        answer:
            'Git Worktree 讓你在同一個 repository 中同時保有多個工作目錄，每個目錄對應不同分支。不同於 `git checkout` 需要來回切換並等待檔案恢復，Worktree 讓多個分支可以同時在獨立資料夾中存在，大幅提升並行開發效率。',
    },
    {
        id: 2,
        question: '什麼情境最適合使用 Git Worktree？',
        answer:
            '最典型的場景包括：同時開發多個 feature、需要緊急 hotfix 而不想 stash 當前工作、進行 code review 需要比對不同版本，以及跑 CI/CD 測試時需要保持主分支乾淨。',
    },
    {
        id: 3,
        question: '如何建立一個新的 Worktree？',
        answer:
            '使用指令 `git worktree add <path> <branch>`。例如：`git worktree add ../feature-login feature/login`，這會在上層目錄建立 `feature-login` 資料夾，並自動 checkout 到 `feature/login` 分支。若分支尚未建立，加上 `-b` 參數即可同時建立新分支。',
    },
    {
        id: 4,
        question: 'Worktree 和 Git Clone 有什麼差別？',
        answer:
            'Clone 會複製整個 repository（包含完整的 `.git` 歷史），而 Worktree 只是新增一個連結目錄，共享同一份 `.git` 資料庫。這意味著 Worktree 佔用更少磁碟空間、建立速度更快，且在任一目錄的 commit 都即時同步。',
    },
    {
        id: 5,
        question: '如何查看目前所有的 Worktree？',
        answer:
            '執行 `git worktree list` 即可列出所有 Worktree 的路徑、commit hash 與對應分支名稱。要移除不再需要的 Worktree，先刪除目錄再執行 `git worktree prune` 清理參照。',
    },
    {
        id: 6,
        question: 'Worktree 有什麼限制需要注意？',
        answer:
            '同一分支不能在兩個 Worktree 中同時 checkout。如果試圖這樣做，Git 會報錯。此外，每個 Worktree 有各自的 `HEAD` 和 index，但共享 stash、tag 和 remote。建議搭配清楚的命名規則管理多個 Worktree，避免混淆。',
    },
    {
        id: 7,
        question: 'SalesPilot 如何與 Git Worktree 工作流程整合？',
        answer:
            'SalesPilot 的 AI Agent 能自動分析需求、拆分 feature、為每個 Worktree 產生 spec 文件，並平行執行開發任務。開發完成後自動產生 conventional commit message 與 PR description，讓整個 Worktree 工作流一鍵完成。',
    },
];

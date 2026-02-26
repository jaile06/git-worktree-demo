import { useState, useEffect } from 'react';

// localStorage 儲存 key
const STORAGE_KEY = 'theme';

/**
 * 取得初始主題：
 * 1. 先查 localStorage 是否有記錄
 * 2. 若無，則偵測系統 prefers-color-scheme
 * 3. 預設 dark（本產品原設計為深色）
 */
function getInitialTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;

    // 偵測系統主題偏好
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

/**
 * 將主題 attribute 套用到 <html> 元素
 * spec 要求掛在 <html> 或 <body> 上，這裡選 <html>
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

/**
 * useTheme — 主題狀態管理 hook
 * @returns {{ theme: string, toggleTheme: Function }}
 */
function useTheme() {
    const [theme, setTheme] = useState(() => {
        const initial = getInitialTheme();
        // 初始化時立刻套用，避免 FOUC（unstyled flash）
        applyTheme(initial);
        return initial;
    });

    // 當 theme 改變時同步 data-theme attribute 與 localStorage
    useEffect(() => {
        applyTheme(theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    // 監聽系統主題變更（只在無 localStorage 記錄時才跟隨系統）
    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e) => {
            // 若使用者曾手動切換，尊重使用者選擇
            if (!localStorage.getItem(STORAGE_KEY)) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };

        mq.addEventListener('change', handleChange);
        return () => mq.removeEventListener('change', handleChange);
    }, []);

    // 切換主題
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return { theme, toggleTheme };
}

export default useTheme;

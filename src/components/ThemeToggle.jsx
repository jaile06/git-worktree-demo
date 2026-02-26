import { useState } from 'react';
import { useThemeContext } from '../context/ThemeContext';

/**
 * ThemeToggle — 主題切換按鈕
 * 從 ThemeContext 取得狀態，不持有獨立 state，避免多實例衝突
 * 顯示 🌞（深色→切淺）或 🌙（淺色→切深）icon，帶旋轉過渡動畫
 */
function ThemeToggle() {
    const { theme, toggleTheme } = useThemeContext();
    // 短暫的 transitioning 狀態觸發 CSS 旋轉動畫
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleClick = () => {
        setIsTransitioning(true);
        toggleTheme();
        // 動畫持續 500ms 後移除 class
        setTimeout(() => setIsTransitioning(false), 500);
    };

    const isDark = theme === 'dark';

    return (
        <button
            className={`theme-toggle${isTransitioning ? ' theme-toggle--transitioning' : ''}`}
            onClick={handleClick}
            aria-label={isDark ? '切換至淺色模式' : '切換至深色模式'}
            title={isDark ? '切換至淺色模式' : '切換至深色模式'}
            type="button"
        >
            {/* 深色模式顯示太陽（點擊→切回亮色），淺色模式顯示月亮（點擊→切深色） */}
            <span className="theme-toggle__icon" aria-hidden="true">
                {isDark ? '🌞' : '🌙'}
            </span>
        </button>
    );
}

export default ThemeToggle;

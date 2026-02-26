import { createContext, useContext } from 'react';

// 主題 Context，提供 theme 與 toggleTheme 給子元件
export const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => { },
});

// 便利 hook：直接從 context 取得主題狀態
export function useThemeContext() {
    return useContext(ThemeContext);
}

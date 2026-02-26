import { useState, useEffect } from 'react';

// Cookie 同意彈窗元件
// - 首次訪問時從底部滑入，同意後寫入 localStorage 並隱藏
// - 支援深色/淺色主題自動適配
const CONSENT_KEY = 'cookieConsent';

function CookieConsent() {
    // visible 控制彈窗是否掛載、show 控制 CSS 滑入動畫
    const [visible, setVisible] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        // 讀取 localStorage，若已同意則直接跳過
        const existing = localStorage.getItem(CONSENT_KEY);
        if (existing) return;

        // 延遲 0.5s 後觸發滑入動畫
        setVisible(true);
        const timer = setTimeout(() => setShow(true), 500);
        return () => clearTimeout(timer);
    }, []);

    // 點擊任一按鈕時寫入同意狀態並隱藏彈窗
    function handleConsent(value) {
        localStorage.setItem(CONSENT_KEY, value);
        // 先縮回去再 unmount
        setShow(false);
        setTimeout(() => setVisible(false), 400);
    }

    if (!visible) return null;

    return (
        <div
            className={`cookie-consent${show ? ' cookie-consent--visible' : ''}`}
            role="dialog"
            aria-label="Cookie 同意通知"
            aria-live="polite"
            id="cookie-consent-banner"
        >
            {/* 主要內容區 */}
            <div className="cookie-consent__inner">
                {/* 圖示 + 文字 */}
                <div className="cookie-consent__content">
                    <span className="cookie-consent__icon" aria-hidden="true">🍪</span>
                    <div className="cookie-consent__text">
                        <p className="cookie-consent__title">我們使用 Cookie</p>
                        <p className="cookie-consent__desc">
                            我們使用 Cookie 來提升您的瀏覽體驗、分析網站流量及個人化內容。
                            您可以選擇接受所有 Cookie，或僅使用必要的功能性 Cookie。
                            {' '}
                            <a
                                href="#"
                                className="cookie-consent__link"
                                onClick={(e) => e.preventDefault()}
                                id="cookie-consent-learn-more"
                            >
                                了解更多
                            </a>
                        </p>
                    </div>
                </div>

                {/* 操作按鈕群組 */}
                <div className="cookie-consent__actions">
                    <button
                        className="btn btn--outline cookie-consent__btn-secondary"
                        onClick={() => handleConsent('necessary')}
                        id="cookie-consent-necessary"
                        type="button"
                    >
                        僅必要 Cookie
                    </button>
                    <button
                        className="btn btn--primary cookie-consent__btn-primary"
                        onClick={() => handleConsent('all')}
                        id="cookie-consent-accept-all"
                        type="button"
                    >
                        接受全部 Cookie
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CookieConsent;

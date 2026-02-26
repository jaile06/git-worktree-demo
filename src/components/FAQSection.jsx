import { useState } from 'react';
import { faqData } from '../data/faqData';

// 單個 FAQ 項目元件，處理展開/收合邏輯
function FAQItem({ item, isOpen, onToggle }) {
    return (
        <div className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}>
            {/* 問題標題列（可點擊） */}
            <button
                className="faq__question"
                onClick={onToggle}
                aria-expanded={isOpen}
                id={`faq-btn-${item.id}`}
                aria-controls={`faq-answer-${item.id}`}
            >
                <span className="faq__question-text">{item.question}</span>
                {/* 展開/收合視覺指示符 */}
                <span className="faq__icon" aria-hidden="true">
                    {isOpen ? '▲' : '▼'}
                </span>
            </button>

            {/* 答案區域：使用 max-height transition 實作滑順動畫 */}
            <div
                id={`faq-answer-${item.id}`}
                className="faq__answer-wrapper"
                role="region"
                aria-labelledby={`faq-btn-${item.id}`}
                style={{ maxHeight: isOpen ? '500px' : '0' }}
            >
                <div className="faq__answer">
                    <p>{item.answer}</p>
                </div>
            </div>
        </div>
    );
}

// FAQ 主區塊元件：採用「同時只開一個」的 Accordion 行為
export default function FAQSection() {
    const [openId, setOpenId] = useState(null);

    // 點擊同一項目時收合，點擊不同項目時切換
    const handleToggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section className="faq" id="faq" aria-labelledby="faq-heading">
            <div className="container">
                {/* 區塊標題 */}
                <div className="section-header">
                    <span className="section-header__badge">常見問題</span>
                    <h2 className="section-header__title" id="faq-heading">
                        關於 Git Worktree，你想知道的都在這
                    </h2>
                    <p className="section-header__desc">
                        從基礎概念到進階工作流程，我們整理了最常見的問題與解答。
                    </p>
                </div>

                {/* FAQ Accordion 列表 */}
                <div className="faq__list" role="list">
                    {faqData.map((item) => (
                        <FAQItem
                            key={item.id}
                            item={item}
                            isOpen={openId === item.id}
                            onToggle={() => handleToggle(item.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

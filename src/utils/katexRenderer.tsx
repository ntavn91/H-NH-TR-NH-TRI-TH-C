/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import katex from 'katex';

interface LatexRendererProps {
  content: string;
  className?: string;
  displayMode?: boolean;
}

export const LatexRenderer: React.FC<LatexRendererProps> = ({
  content,
  className = '',
  displayMode = false,
}) => {
  const renderedHtml = useMemo(() => {
    if (!content) return '';

    // Helper to normalize degrees and common symbols
    const cleanMath = (str: string) => {
      return str
        .replace(/([0-9a-zA-Z\)\}])\s*°/g, '$1^\\circ')
        .replace(/\^°/g, '^\\circ')
        .replace(/°/g, '^\\circ');
    };

    // 1. Process mixed text containing $...$ (inline) or $$...$$ (display block)
    if (content.includes('$')) {
      const regex = /(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g;
      return content.replace(regex, (match) => {
        const isDisplay = match.startsWith('$$');
        const rawMath = isDisplay ? match.slice(2, -2) : match.slice(1, -1);
        const math = cleanMath(rawMath);
        try {
          const rendered = katex.renderToString(math.trim(), {
            displayMode: isDisplay,
            throwOnError: false,
          });
          if (isDisplay) {
            return `<div class="my-3 overflow-x-auto text-center">${rendered}</div>`;
          }
          return `<span class="inline-block px-1 align-middle whitespace-nowrap">${rendered}</span>`;
        } catch {
          return match;
        }
      });
    }

    // 2. If content does NOT contain $, check if it has LaTeX macros or is a math expression
    const hasLatexMacro = /\\[a-zA-Z]+/.test(content);
    const hasMathSymbols = /[\^_{}=<>+\-*/]/.test(content);
    const hasDegree = content.includes('°');

    if (hasLatexMacro || hasMathSymbols || hasDegree) {
      // Check if it's pure text with no LaTeX commands
      const hasVietnamese = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(content);
      // If it contains Vietnamese and doesn't have explicit backslash macros like \text or \widehat or \dfrac, leave as text
      if (hasVietnamese && !hasLatexMacro) {
        return content;
      }

      try {
        const math = cleanMath(content.trim());
        return katex.renderToString(math, {
          displayMode: displayMode,
          throwOnError: false,
        });
      } catch {
        return content;
      }
    }

    return content;
  }, [content, displayMode]);

  return (
    <span
      className={`leading-relaxed text-slate-100 ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

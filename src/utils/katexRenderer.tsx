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

    // If content does not contain $ at all, check if it's a raw formula (like options "\dfrac{1}{14}", "-0{,}8", "x = 3", etc.)
    if (!content.includes('$')) {
      const hasMathChars = /[\\^_{}]|[=<>+\-*/]|\d+/.test(content);
      const hasVietnamese = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(content);
      if (!hasVietnamese && hasMathChars) {
        try {
          return katex.renderToString(content.trim(), {
            displayMode: displayMode,
            throwOnError: false,
          });
        } catch {
          // fallback to text
        }
      }
    }

    // Process mixed text containing $...$ (inline) or $$...$$ (display block)
    const regex = /(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/g;
    return content.replace(regex, (match) => {
      const isDisplay = match.startsWith('$$');
      const math = isDisplay ? match.slice(2, -2) : match.slice(1, -1);
      try {
        // ALWAYS use displayMode: false for single $...$ to prevent forcing full-width line breaks!
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
  }, [content, displayMode]);

  return (
    <span
      className={`leading-relaxed text-slate-100 ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

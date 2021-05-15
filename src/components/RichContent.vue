<template>
  <article class="richContent">
    <div v-html="htmlContent"></div>
  </article>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, watch } from "vue";
import marked from "marked";
import Hljs from "highlight.js";

export default defineComponent({
  name: "RichContent",
  props: {
    sanitize: Boolean,
    content: String,
    isMarkdown: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const htmlContent = ref("<div>xxxxxx</div>");
    const { sanitize, content, isMarkdown } = toRefs(props);
    const renderer = new marked.Renderer();

    watch(
      () => content?.value,
      (content) => {
        if (!content) {
          return;
        }
        htmlContent.value = `<div id="content">${
          isMarkdown ? marked(content, { renderer }) : content
        }</div>`;
      }
    );

    // 链接解析
    const linkRender = (href: string, title: string, text: string): string => {
      return `<a href="${href}">${text}</a>`;
    };

    // 代码解析
    const codeRender = (
      code: string,
      lang: string,
      escaped: boolean
    ): string => {
      const { options } = renderer as any;
      if (options.highlight) {
        const out = options.highlight(code, lang);
        if (out != null && out !== code) {
          escaped = true;
          code = out;
        }
      }
      return `<pre><code>${escaped ? code : escape(code)}\n</code></pre>`;
    };

    // 图片解析
    const imageRender = (src: string, title: string, alt: string): string => {
      return `<img data-echo="${src}" src="/thumb-carrousel.gif"/>`;
    };

    // 字段解析
    const headingRender = (
      text: string,
      level: number,
      raw: string
    ): string => {
      const id = raw.toLowerCase().replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g, "-");
      return `<h${level} id=${id}>${text}</h${level}>`;
    };

    // 段落解析
    const paragraphRender = (text: string): string => {
      return `<p>${text}</p>`;
    };

    const initMarked = () => {
      marked.setOptions({
        renderer: new marked.Renderer(),
        sanitize: sanitize?.value == null ? true : sanitize?.value,
        smartLists: true,
        // 自动检测code语言
        highlight(code: string) {
          return Hljs.highlightAuto(code).value;
        },
      });
    };

    const initRenderer = () => {
      renderer.link = linkRender;
      renderer.image = imageRender;
      renderer.heading = headingRender;
      renderer.paragraph = paragraphRender;
			renderer.code = codeRender;
    };

    const init = () => {
      initMarked();
      initRenderer();
    };

    onMounted(init);

    return {
      htmlContent,
    };
  },
});
</script>

<style>
/* Ocean Dark Theme */
/* https://github.com/gavsiu */
/* Original theme - https://github.com/chriskempson/base16 */

/* Ocean Comment */
.hljs-comment,
.hljs-quote {
  color: #65737e;
}

/* Ocean Red */
.hljs-variable,
.hljs-template-variable,
.hljs-tag,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class,
.hljs-regexp,
.hljs-deletion {
  color: #bf616a;
}

/* Ocean Orange */
.hljs-number,
.hljs-built_in,
.hljs-builtin-name,
.hljs-literal,
.hljs-type,
.hljs-params,
.hljs-meta,
.hljs-link {
  color: #d08770;
}

/* Ocean Yellow */
.hljs-attribute {
  color: #ebcb8b;
}

/* Ocean Green */
.hljs-string,
.hljs-symbol,
.hljs-bullet,
.hljs-addition {
  color: #a3be8c;
}

/* Ocean Blue */
.hljs-title,
.hljs-section {
  color: #8fa1b3;
}

/* Ocean Purple */
.hljs-keyword,
.hljs-selector-tag {
  color: #b48ead;
}

.hljs {
  display: block;
  overflow-x: auto;
  background: #2b303b;
  color: #c0c5ce;
  padding: 0.5em;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

#content {
	color: #555;
	color: var(--mardownTextColor);
}

#content hr {
  height: 1px;
  background-color: #f0f0f0;
  background-color: var(--border);
  margin-bottom: 1rem;
}

#content iframe {
  width: 100%;
  margin-bottom: 1rem;
  background-color: #000;
  background-color: var(--inverse);
  max-height: 250px;
}

#content blockquote {
  margin: 1rem 0;
  border-left: 0.5rem solid #eee;
  border-left: 0.5rem solid var(--mardownTextMuted);
  padding: 0.5rem;
  padding-left: 1rem;
}
#content blockquote p:last-child {
  margin-bottom: 0;
}

#content a {
  color: #7cb305;
  color: var(--primary);
  text-decoration: none;
  font-weight: bold;
  margin: 0 0.1rem;
	word-break: break-all;
}
#content a.image-link {
  margin: 0;
}

#content img {
  width: 100%;
  position: relative;
  margin: 0 auto;
  display: block;
  text-align: center;
}

#content p {
  line-height: 2em;
  margin-bottom: 1em;
  text-align: justify;
}
#content p.text-center {
  text-align: center;
}
#content p.text-right {
  text-align: right;
}
#content strong {
  font-weight: bold;
}
#content small {
  font-size: 0.85rem;
}
#content h1 {
  font-size: 1.5rem;
}
#content h2 {
  font-size: 1.25rem;
}
#content h3 {
  font-size: 1.1rem;
}
#content h4,
#content h5 {
  font-size: 1rem;
}

#content h1,
#content h2,
#content h3,
#content h4,
#content h5,
#content h6 {
  color: #222;
  color: var(--mardownTitleColor);
  margin-bottom: 0.8em;
  line-height: 1.8em;
  font-weight: 700;
  text-indent: 0;
}

#content ul,
#content ol {
  margin: 0;
  margin-bottom: 1rem;
  padding: 0;
  padding-left: 1.6rem;
}
#content ul {
  list-style-type: none;
}
#content ul > li,
#content ol > li {
  line-height: 1.8em;
  margin-bottom: 1rem;
  position: relative;
}
#content ul > li:before {
  content: "";
  position: absolute;
  left: -1rem;
  top: 0.6rem;
  width: 0.3rem;
  height: 0.3rem;
  background-color: #555;
  background-color: var(--mardownTextColor);
}
#content ul > li > p,
#content ol > li > p {
  text-indent: 0;
}
#content ul > li > p + ul,
#content ul > li > p + ol,
#content ul > li > ul,
#content ul > li > ol {
  margin-top: 1rem;
}
#content ul > li:last-child,
#content ol > li:last-child,
#content ul > li:last-child > p,
#content ol > li:last-child > p,
#content ul > li > ul:last-child,
#content ul > li > ol:last-child,
#content ol > li > ol:last-child,
#content ol > li > ul:last-child {
  margin-bottom: 0;
}

#content code {
  color: #bd4147;
  margin: 0 0.3rem;
  padding: 0.3rem;
  border-radius: 2px;
  background-color: #eee;
  background-color: var(--mardownTextMuted);
}

#content pre {
  margin: 0;
  padding: 0;
  width: 100%;
  max-height: 200px;
  display: block;
  position: relative;
  margin-bottom: 1rem;
  background-color: #000;
  background-color: var(--inverse);
  font-family: monospace, monospace;
  white-space: pre;
  overflow: auto;
}
#content pre > code {
  margin: 0;
  padding: 10px;
  display: block;
  font-size: 14px !important;
  line-height: 1.6em;
  color: #eee;
  color: var(--mardownTextMuted);
  background-color: transparent;
  vertical-align: baseline;
}

#content table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 10px;
}
#content caption {
  padding: 10px;
}
#content thead th {
  text-align: left;
}
#content tr {
  margin-bottom: 10px;
}
#content th,
#content td {
  vertical-align: inherit;
  font-size: 14px;
  border: 1px solid #eee;
  border: 1px solid var(--mardownTextMuted);
  padding: 0.5rem;
  vertical-align: inherit;
}
#content tfoot tr {
  text-align: left;
}
#content tfoot td {
  font-style: italic;
  padding: 10px;
}
</style>

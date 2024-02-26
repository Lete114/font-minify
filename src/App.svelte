<script>
  import * as I18n from 'mini-i18n'
  import minify from 'font-minify'
  import msg from 'msg-alert'
  import woff2Wasm from 'font-minify/woff2Wasm?url'

  const lang = navigator.language.split('-')[0]
  const options = {
    lang, // default language
    languages: {
      en: {
        title: 'Font Compressor',
        selected: 'Selected file',
        drop: 'Click to upload or drag and drop the file here',
        input: {
          desc: 'Retained text only after compression',
          placeholder: 'Enter text here...',
          tooltip:
            'You can type "a" or "\\61", both of which are the same and correspond to the "a" in the font (icon fonts can only be used in the second way)'
        },
        output: {
          desc: 'Compressed output font suffix'
        },
        button: {
          minify: 'Compressed',
          download: 'Download'
        }
      },
      zh: {
        title: '字体压缩器',
        selected: '已选择文件',
        drop: '点击上传或将文件拖拽到此处',
        input: {
          desc: '压缩后只保留的文本',
          placeholder: '在此输入文本...',
          tooltip:
            '你可以输入“a”或“\\61”，这两个都是相同的，对应字体中的“a”（图标字体只能使用第二种方式）'
        },
        output: {
          desc: '压缩后输出的字体后缀'
        },
        button: {
          minify: '压缩',
          download: '下载'
        }
      }
    }
  }

  // Initialize and return a translation method
  const t = I18n.init(options)
  // @ts-ignore
  document.querySelector('title').textContent = t('title')

  const FONT_SUFFIX = ['.ttf', '.otf', '.eot', '.woff', '.woff2']
  const supportFontSuffix = FONT_SUFFIX.filter((i) => i !== '.otf')

  let isMinify = false
  let isFileSelected = false
  let isDropArea = false
  let dropAreaDom

  let selectedStatus = 'none'
  let fileName = ''
  let inputText = ''
  let downloadOptions = {}

  /**@type {File}*/
  let selectedFile = null
  let selectOutputFontSuffix = ''
  $: {
    selectOutputFontSuffix
    isMinify = false
  }

  function onInputText() {
    isMinify = false
  }

  function handleFiles(files) {
    // 处理选择的文件，可以根据需求进行上传或其他操作
    if (files && files.length) {
      const file = files[0]
      selectedFile = file
      fileName = file.name
      selectOutputFontSuffix = fileName
        .replace(/.*?(\.[\d\w]+)$/, '$1')
        .replace('otf', 'ttf')

      isMinify = false
      isFileSelected = true
      selectedStatus = 'selected'
    }
  }

  function onFileSelected(event) {
    const input = event.target
    /**@type {FileList} */
    const files = input.files
    handleFiles(files)
  }

  function dragOverHandler(event) {
    event.preventDefault()
    isDropArea = true
  }

  function dragLeaveHandler(event) {
    event.preventDefault()
    isDropArea = false
  }

  function dropHandler(event) {
    event.preventDefault()
    isDropArea = false

    // 获取拖拽的文件列表
    const files = event.dataTransfer.files

    // 处理选择的文件，例如上传或其他操作
    handleFiles(files)
  }

  function onClickMinify() {
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = async function (event) {
        try {
          const result = event.target.result

          const suffix = fileName.replace(/.*?([\d\w]+)$/, '$1')
          const outputSuffix = selectOutputFontSuffix.replace('.', '')

          const miniFile = await minify({
            buffer: result,
            text: inputText,
            wasm: { woff2: woff2Wasm },
            readOptions: {
              // @ts-ignore
              type: suffix
            },
            writeOptions: {
              // @ts-ignore
              type: outputSuffix
            }
          })

          downloadOptions = {
            arrayBuffer: miniFile,
            fileName: fileName.replace(suffix, outputSuffix)
          }

          isMinify = true
        } catch (error) {
          console.error(error)
          // @ts-ignore
          msg.error(error.message)
        }
      }

      // 读取文件内容为二进制数据
      reader.readAsArrayBuffer(selectedFile)
    }
  }

  function onClikcDownload() {
    console.log(downloadOptions)
    const blob = new Blob([downloadOptions.arrayBuffer], {
      type: 'application/octet-stream'
    })
    // const url = URL.createObjectURL(blob)

    // const downloadLink = document.createElement('a')
    // downloadLink.href = url
    // downloadLink.download = downloadOptions.fileName
    // downloadLink.style.display = 'none'
    // document.body.appendChild(downloadLink)
    // downloadLink.click()
    // document.body.removeChild(downloadLink)

    // URL.revokeObjectURL(url)

    isMinify = false
  }
</script>

<main
  class="p-20px flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900"
>
  <header class="mb-8">
    <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100">
      {t('title')}
    </h1>
  </header>
  <section
    class="flex flex-col items-center justify-center gap-4 max-w-md w-full"
  >
    <label
      bind:this={dropAreaDom}
      for="fileInput"
      class="{isDropArea && 'border-#007BFF'} {isFileSelected &&
        'border-#22c55e'} w-full cursor-pointer flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-10 h-200px select-none"
      on:drop={dropHandler}
      on:dragover={dragOverHandler}
      on:dragleave={dragLeaveHandler}
    >
      <input
        type="file"
        accept={FONT_SUFFIX.toString()}
        on:change={onFileSelected}
        class="hidden"
        id="fileInput"
      />

      {#if selectedStatus === 'selected'}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-12 h-12 text-green-500 dark:text-green-400"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <p class="text-gray-500 dark:text-gray-400">{t('selected')}</p>
        <p
          class="overflow-hidden text-ellipsis w-full whitespace-nowrap text-center"
        >
          {fileName}
        </p>
      {/if}

      {#if selectedStatus === 'none'}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-12 h-12 text-blue-500 dark:text-blue-400"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" x2="12" y1="3" y2="15"></line>
        </svg>
        <p class="text-gray-500 dark:text-gray-400">
          {t('drop')}
        </p>
      {/if}
    </label>
    <div
      class="w-full rounded-lg border border-#e4e4e7 border-solid shadow-sm p-0 overflow-hidden"
    >
      <div class="keep-text flex flex-col space-y-1.5 p-[24px_24px_0]">
        <div class="flex text-#71717a text-sm font-medium">
          {t('input.desc')}
          <svg
            class="w-14px ml-4px text-#afafaf"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
            >
            </path>
          </svg>
          <div class="relative">
            <div class="tooltip absolute text-12px">{t('input.tooltip')}</div>
          </div>
        </div>
      </div>
      <div class="p-6">
        <textarea
          bind:value={inputText}
          on:click={onInputText}
          class="w-full min-h-32 resize-y border rounded-md p-2 dark:bg-gray-800 dark:text-gray-100"
          placeholder={t('input.placeholder')}
        ></textarea>
      </div>
      <div class="flex flex-col space-y-1.5 p-[0_24px_24px]">
        <p class="text-#71717a text-sm font-medium">{t('output.desc')}</p>
      </div>
      <div class="p-6 pt-0">
        <!-- <Select>
        </Select> -->

        <div class="grid grid-cols-4">
          {#each supportFontSuffix as item}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <label
              class="select mr-1rem mb-4px relative whitespace-nowrap overflow-hidden text-ellipsis"
            >
              <input
                type="radio"
                bind:group={selectOutputFontSuffix}
                value={item}
                class="op-0 mr-6px"
              />
              <span
                class="absolute border-#979797 left-0 top-0 w-1.2rem h-1.2rem border-2px border-solid border-rd-1rem bg-transparent"
              ></span>{item}
            </label>
          {/each}
        </div>

        <button
          on:click={onClickMinify}
          disabled={!isFileSelected || !inputText || isMinify}
          class="{!isFileSelected || !inputText || isMinify
            ? 'disabled:pointer-events-none disabled:opacity-50'
            : 'cursor-pointer hover:bg-#f4f4f5'} mt-4 select-none outline-none shadow-none inline-flex items-center justify-center rounded-md text-sm font-medium bg-#fff transition-colors border border-#e4e4e7 border-solid h-10 px-4 py-2 w-full max-w-md"
          >{t('button.minify')}</button
        >
        <button
          on:click={onClikcDownload}
          disabled={!isMinify}
          class="{!isMinify
            ? 'disabled:pointer-events-none disabled:opacity-50'
            : 'cursor-pointer hover:bg-#f4f4f5'} mt-4 select-none outline-none shadow-none inline-flex items-center justify-center rounded-md text-sm font-medium bg-#fff transition-colors border border-#e4e4e7 border-solid hover:bg-#f4f4f5 h-10 px-4 py-2 w-full max-w-md"
          >{t('button.download')}</button
        >
      </div>
    </div>
  </section>
</main>

<style lang="postcss">
  .select input[type='radio']:checked {
    & + span {
      border: 5px solid #00b066;
    }
  }
  .keep-text {
    .tooltip {
      display: none;
    }
    &:hover {
      .tooltip {
        width: 140px;
        display: block;
        background: #e5eaf3;
        left: 12px;
        padding: 5px 11px;
        border-radius: 4px;
        top: -5px;

        &:after {
          top: 5px;
          right: 100%;
          border: solid transparent;
          content: ' ';
          height: 0;
          width: 0;
          position: absolute;
          pointer-events: none;
          border-right-color: #e5eaf3;
          border-width: 10px;
        }
      }
    }
  }
</style>

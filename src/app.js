goog.provide('app.todo');

goog.require('goog.dom');
goog.require('goog.events');

/**
 * TODOアプリの初期化処理
 * @return {void}
 */
app.todo.init = function () {
  /** @type {!HTMLInputElement} */
  const input = /** @type {!HTMLInputElement} */ (
    goog.dom.getElement('todoInput')
  );
  /** @type {!HTMLButtonElement} */
  const addBtn = /** @type {!HTMLButtonElement} */ (
    goog.dom.getElement('addBtn')
  );
  /** @type {!HTMLUListElement} */
  const list = /** @type {!HTMLUListElement} */ (
    goog.dom.getElement('todoList')
  );

  goog.events.listen(addBtn, goog.events.EventType.CLICK, function (e) {
    const text = input.value.trim();
    if (!text) return;

    /** @type {!HTMLLIElement} */
    const li = /** @type {!HTMLLIElement} */ (
      goog.dom.createDom('li')
    );
    /** @type {!HTMLSpanElement} */
    const textSpan = /** @type {!HTMLSpanElement} */ (
      goog.dom.createDom('span', {'class': 'text'}, text)
    );
    /** @type {!HTMLButtonElement} */
    const editBtn = /** @type {!HTMLButtonElement} */ (
      goog.dom.createDom('button', {'class': 'edit'}, '編集')
    );

    goog.events.listen(editBtn, goog.events.EventType.CLICK, function (e) {
      e.stopPropagation();

      /** @type {?HTMLSpanElement} */
      const span = /** @type {?HTMLSpanElement} */ (
        goog.dom.getElementByClass('text', li)
      );
      if (!span) return; // 既に編集中なら無視

      // span → input に置き換え
      /** @type {!HTMLInputElement} */
      const inputField = /** @type {!HTMLInputElement} */ (
        goog.dom.createDom('input', {
          'type': 'text',
          'value': span.textContent
        })
      );

      goog.dom.replaceNode(inputField, span);
      inputField.focus();


      let finished = false;
      /**
       * 編集確定処理
       * @return {void}
       */
      const finishEdit = function () {
        if (finished) return;
        finished = true;
        
        if (!inputField.parentNode) return; // 既に削除された場合は無視

        /** @type {!HTMLSpanElement} */
        const newSpan = /** @type {!HTMLSpanElement} */ (
          goog.dom.createDom('span', {'class': 'text'}, inputField.value)
        );
        goog.dom.replaceNode(newSpan, inputField);
      };

      // Enterで確定
      goog.events.listen(inputField, goog.events.EventType.KEYDOWN, function (
        /** @type {!KeyboardEvent} */ ev
      ) {
        if (ev.key === 'Enter') finishEdit();
      });

      // blurでも確定
      goog.events.listen(inputField, goog.events.EventType.BLUR, finishEdit);
    });

    // 削除ボタン作成
    /** @type {!HTMLButtonElement} */
    const delBtn = /** @type {!HTMLButtonElement} */ (
      goog.dom.createDom('button', {'class': 'del'}, '削除')
    );
    // ボタンクリックでその li を削除
    goog.events.listen(delBtn, goog.events.EventType.CLICK, function (e) {
      e.stopPropagation(); // li クリックに伝播しないように
      goog.dom.removeNode(li);
    });

    // li にテキストと削除ボタンと編集ボタンを追加
    goog.dom.appendChild(li, textSpan);
    goog.dom.appendChild(li, editBtn);
    goog.dom.appendChild(li, delBtn);

    // ul に li を追加
    goog.dom.appendChild(list, li);

    // // ✅ li をクリックしたら削除する
    // goog.events.listen(li, goog.events.EventType.CLICK, function (e) {
    //   const target = e.target;
    //   goog.dom.removeNode(target);
    // });

    input.value = '';
    input.focus();
  });
};

// ページ読み込み時の初期化
goog.events.listen(window, goog.events.EventType.LOAD, app.todo.init);

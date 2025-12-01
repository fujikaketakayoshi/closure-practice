goog.provide('app.todo');

goog.require('goog.dom');
goog.require('goog.events');

app.todo.init = function () {
  const input = goog.dom.getElement('todoInput');
  const addBtn = goog.dom.getElement('addBtn');
  const list = goog.dom.getElement('todoList');

  goog.events.listen(addBtn, goog.events.EventType.CLICK, function () {
    const text = input.value.trim();
    if (!text) return;

     // li とテキストノードを作成
    const li = goog.dom.createDom('li');
    // span（テキスト表示）
    const textSpan = goog.dom.createDom('span', {class: 'text'}, text);

        // 編集ボタン
    const editBtn = goog.dom.createDom('button', {class: 'edit'}, '編集');
    goog.events.listen(editBtn, goog.events.EventType.CLICK, function (e) {
      e.stopPropagation();

      // 最新の span を取得
      const span = goog.dom.getElementByClass('text', li);
      if (!span) return; // 既に編集中なら無視

      // span → input に置き換え
      const inputField = goog.dom.createDom('input', {type: 'text', value: span.textContent});
      goog.dom.replaceNode(inputField, span);
      inputField.focus();

      const finishEdit = function () {
        if (!inputField.parentNode) return; // 既に削除された場合は無視
        const newSpan = goog.dom.createDom('span', {class: 'text'}, inputField.value);
        goog.dom.replaceNode(newSpan, inputField);
      };

      // Enterで確定
      goog.events.listen(inputField, goog.events.EventType.KEYDOWN, function (ev) {
        if (ev.key === 'Enter') finishEdit();
      });

      // blurでも確定
      goog.events.listen(inputField, goog.events.EventType.BLUR, finishEdit);
    });

    // 削除ボタン作成
    const delBtn = goog.dom.createDom('button', {class:'del'}, '削除');
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

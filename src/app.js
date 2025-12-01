goog.provide('app.todo');

goog.require('goog.dom');
goog.require('goog.events');

app.todo.init = function () {
  const input = goog.dom.getElement('todoInput');
  const button = goog.dom.getElement('addBtn');
  const list = goog.dom.getElement('todoList');

  goog.events.listen(button, goog.events.EventType.CLICK, function () {
    const text = input.value.trim();
    if (!text) return;

    const li = goog.dom.createDom('li', null, text);
    goog.dom.appendChild(list, li);

    input.value = '';
  });
};

window.onload = app.todo.init;

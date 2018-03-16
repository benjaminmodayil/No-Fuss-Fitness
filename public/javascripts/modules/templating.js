exports.mealModalTemplate = `
  <div class="modal--blur">
  </div>
    <div class="modal-inner">
      <button class="modal-close">close</button>
      <h2 class="m-top-32">Add an item for <span class="modal-day">Tuesday</span></h2>
      <form method="POST" class="form">
        <label class="block screenreader-only" for="title">Title</label>
        <input class="block" type="text" id="title" name="title" value="Title" placeholder="Meal name" required autocomplete="off"
          aria-required="true">
        <label class="block screenreader-only" for="calories">calories</label>
        <input class="block" type="text" id="calories" name="calories" placeholder="0" autocomplete="off>
        <label class="block screenreader-only" for="date">Date</label>
        <input class="block" type="date" id="date" name="Date Entry">
        <button class="modal-submit" type="submit">meal +</button>
      </form>
    </div>
  `

exports.itemTemplate = obj => {
  let listItem = document.createElement('li')
  listItem.dataset.id = obj._id

  let template = `
    <article>
      <details>
        <summary>${obj.title}</summary>
        <div>
          <span>${obj.date}</span>
          <span>${obj.calories} cals</span>
          <button class="item-edit">edit</button>
          <button class="item-delete">delete</button>
        </div>
      </details>
    </article>
  `
  listItem.innerHTML = template
  console.log(listItem)
  return listItem
}

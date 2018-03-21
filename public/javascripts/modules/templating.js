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
        <input class="block" type="date" id="date" name="date">
        <button class="modal-submit" type="submit">add +</button>
      </form>
    </div>
  `

exports.itemTemplate = (obj, type) => {
  let listItem = document.createElement('li')
  listItem.dataset.id = obj._id
  let template

  if (type === 'featured') {
    listItem.classList.add(
      'list-reset',
      'item',
      'px-2',
      'text-base',
      'mb-4',
      'w-full',
      'md-w-1-2',
      'lg-w-1-3',
      'flex-no-grow',
      'flex-no-shrink'
    )

    template = `
    <article class="relative bg-white b-shadow p-4">
      <p class="item__data py-2"><span class="data__title block mb-2">${
        obj.title
      }</span><span class="data__calories block text-xl text-red font-bold"><span class="data__number">${
      obj.calories
    }</span><span class="text-black text-base font-normal">  cals</span></span></p>
      <div class="item__functions flex flex-col h-full absolute pin-r pin-t w-4">
        <button class="item-edit pin-t pin-r mt-1 absolute"><img class="w-4" src="/images/icons/icon-edit.svg" alt=""/></button>
        <button class="item-delete pin-b pin-r mb-1 absolute"><img class="w-4" src="/images/icons/icon-close.svg" alt=""/></button>
      </div>
    </article>
    `
  } else {
    listItem.classList.add(
      'list-reset',
      'b-shadow',
      'item',
      'px-2',
      'text-base',
      'mb-4',
      'bg-white'
    )
    template = `
    <article class="relative">
  <p class="item__data py-2"><span class="data__title block mb-2">${
    obj.title
  }</span><span class="data__calories block text-xl text-red font-bold"><span class="data__number">${
      obj.calories
    }</span><span class="text-black text-base font-normal"> cals</span></span></p>
  <div class="item__functions flex flex-col h-full absolute pin-r pin-t w-4">
    <button class="item-edit pin-t pin-r mt-1 absolute"><img class="w-4" src="/images/icons/icon-edit.svg" alt=""/></button>
    <button class="item-delete pin-b pin-r mb-1 absolute"><img class="w-4" src="/images/icons/icon-close.svg" alt=""/></button>
  </div>
</article>
    `
  }

  listItem.innerHTML = template
  return listItem
}

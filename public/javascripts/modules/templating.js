exports.mealModalTemplate = `
  <div class="modal--blur">
  </div>
  <div class="modal-inner flex flex-col rounded p-4">
    <button class="modal-close self-end bg-red text-white py-2 px-4 rounded">
      <span class="screenreader-only">close</span>
      <img src="/images/icons/icon-close-white.svg" alt="">
    </button>
    <h2 class="mb-16">
      <span class="block text-center text-lg font-normal">
        Add
        <span class="modal-type">item</span> for
        <span class="modal-day block text-blue text-2xl font-bold mt-1">Tuesday</span>
      </span>
    </h2>
    <form method="POST" class="form px-8">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="title">Title</label>
      <input class="block shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mx-auto mb-4" type="text" id="title" name="title" value="Title" placeholder="Meal name" required autocomplete="off"
        aria-required="true">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="calories">Calories</label>
      <input class="block shadow appearance-none border rounded w-1-6 py-2 px-3 text-grey-darker mb-4" type="number" id="calories" name="calories" placeholder="0" autocomplete="off">
      <label class="block screenreader-only" for="date">Date</label>
      <input class="block screenreader-only" type="date" id="date" name="date">
      <button class="modal-submit bg-green hover:bg-green-dark text-white font-bold py-2 px-4 mt-8 rounded float-right" type="submit">add +</button>
    </form>
  </div>
  `

exports.exerciseModalTemplate = `
<div class="modal--blur">
</div>
<div class="modal-inner flex flex-col rounded p-4">
  <button class="modal-close self-end bg-red text-white py-2 px-4 rounded">
    <span class="screenreader-only">close</span>
    <img src="/images/icons/icon-close-white.svg" alt="">
  </button>
  <h2 class="mb-16">
    <span class="block text-center text-lg font-normal">
      Add
      <span class="modal-type">item</span> for
      <span class="modal-day block text-blue text-2xl font-bold mt-1">Tuesday</span>
    </span>
  </h2>
  <form method="POST" class="form form--exercise px-8">
    <label class="block text-grey-darker text-sm font-bold mb-2" for="title">Title</label>
    <input class="block shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mx-auto mb-4" type="text" id="title" name="title" value="Title" placeholder="exercise name" required autocomplete="off" aria-required="true">

    <div class="flex my-8">
      <div class="w-1-2 flex justify-center">
        <input class="mr-2" type="radio" id="type-1" name="type" value="reps">
        <label for="type-1">Reps</label>
      </div>

      <div class="w-1-2 flex justify-center">
        <input class="mr-2" type="radio" id="type-2" name="type" value="run">
        <label for="type-2">Run</label>
      </div>
    </div>

    <div class="screenreader-only modal--rep">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="reps">Reps</label>
      <input class="block shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mx-auto mb-4" type="text" id="reps" name="reps" placeholder="reps #" autocomplete="off">

      <label class="block text-grey-darker text-sm font-bold mb-2" for="sets">Sets</label>
      <input class="block shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mx-auto mb-4" type="text" id="sets" name="sets" placeholder="sets #" autocomplete="off" aria-required="true">
    </div>

    <div class="screenreader-only modal--run">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="distance">Distance</label>
      <input class="block shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mx-auto mb-4" type="text" id="distance" name="distance" placeholder="distance # in miles" autocomplete="off" aria-required="true">

      <label class="block text-grey-darker text-sm font-bold mb-2" for="time">Time</label>
      <input class="block shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mx-auto mb-4" type="text" id="time" name="time" placeholder="time" autocomplete="off" aria-required="true">

      <label class="block text-grey-darker text-sm font-bold mb-2" for="calories">Calories</label>
      <input class="block shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mx-auto mb-4" type="text" id="calories" name="calories" placeholder="0">
    </div>
    <label class="block text-grey-darker text-sm font-bold mb-2" for="date">Date</label>
    <input class="block shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mx-auto mb-4" type="date" id="date" name="date">

    <button class="modal-submit bg-green hover:bg-green-dark text-white font-bold py-2 px-4 mt-8 rounded float-right" type="submit">add +</button>
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

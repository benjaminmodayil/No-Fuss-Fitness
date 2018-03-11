let modalAddNew = `
  <div class="modal--blur">
  </div>
    <div class="modal-inner">
      <button class="modal-close">close</button>
      <h2 class="m-top-32">Add a meal for <span class="modal-day">Tuesday</span></h2>
      <form method="POST" class="meal-form">
        <label class="block screenreader-only" for="meal-title">Title</label>
        <input class="block" type="text" id="meal-title" name="Meal Entry" value="Title" placeholder="Meal name" required autocomplete="off"
          aria-required="true">
        <label class="block screenreader-only" for="meal-calories">Description</label>
        <input class="block" type="text" id="meal-calories" name="Meal calories" placeholder="0">
        <label class="block screenreader-only" for="meal-date">Date</label>
        <input class="block" type="date" id="meal-date" name="Date Entry">
        <button class="modal-submit" type="submit">meal +</button>
      </form>
    </div>
`

let test = `
  whadup my main drip
`

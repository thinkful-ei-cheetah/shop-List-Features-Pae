/* eslint-disable indent */
/* eslint-disable strict */

const STORE = [
    {name: "apples", checked: false},
    {name: "oranges", checked: false},
    {name: "milk", checked: true},
    {name: "bread", checked: false}
  ];


function generateShoppingItemHtml(item, itemIndex){
    const checkedClass = item.checked ? 'shopping-item__checked' : '';
  
    return `
      <li class="js-item-index-element" data-item-index="${itemIndex}">
        <span class="shopping-item js-shopping-item ${checkedClass}">${item.name}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
     </li>
    `;
  }

  function generateShoppingListElements(items){
    // Create new array of HTML strings
    const elements = items.map((item, index) => {
      return generateShoppingItemHtml(item, index);
    });
  
    // Join the array into a single string and return it
    return elements.join();
  }

const SHOPPING_LIST_EL = $('.shopping-list');
// turn css class into variable

function renderShoppingList() {
  const html = generateShoppingListElements(STORE);
  // html = list elements HTML
  SHOPPING_LIST_EL.html(html);  
  // css class html is now list elements html
}

  
  console.log(generateShoppingListElements(STORE));

  function addItemToShoppingList(itemName) {
    // function pushes obj to array with name and checked keys
    console.log(`Adding "${itemName}" to shopping list`);
    STORE.push({id: cuid(), name: itemName, checked: false});
  }


  function handleNewItemSubmit() {
    // when new submit reset dom usage
    $('#js-shopping-list-form').submit(function(event) {
      event.preventDefault();
      const newItemName = $('.js-shopping-list-entry').val();
      
      
      console.log('`handleNewItemSubmit` ran');
      $('.js-shopping-list-entry').val('');
      // resets value of form to empty string

      addItemToShoppingList(newItemName);
    });
  }

  function toggleCheckedForListItem(itemId) {
    console.log("Toggling checked property for item with id " + itemId);
    const item = STORE.find(item => item.id === itemId);
    item.checked = !item.checked;
  }
  
  
  function getItemIdFromElement(item) {
    return $(item)
      .closest('li')
      .data('item-id');
  }
  
  function handleItemCheckClicked() {
    $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
      console.log('`handleItemCheckClicked` ran');
      const id = getItemIdFromElement(event.currentTarget);
      toggleCheckedForListItem(id);
      renderShoppingList();
    });
  }

  function deleteListItem(itemId) {
    console.log(`Deleting item with id  ${itemId} from shopping list`)
  
    // as with `addItemToShoppingLIst`, this function also has the side effect of
    // mutating the global STORE value.
    //
    // First we find the index of the item with the specified id using the native
    // Array.prototype.findIndex() method. Then we call `.splice` at the index of 
    // the list item we want to remove, with a removeCount of 1.
    const itemIndex = STORE.findIndex(item => item.id === itemId);
    STORE.splice(itemIndex, 1);
  }
  
  
  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-shopping-list').on('click', '.js-item-delete', event => {
      // get the index of the item in STORE
      const itemIndex = getItemIdFromElement(event.currentTarget);
      // delete the item
      deleteListItem(itemIndex);
      // render the updated shopping list
      renderShoppingList();
    });
  }
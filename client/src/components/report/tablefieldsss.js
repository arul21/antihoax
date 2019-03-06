export default {
  tableFields: [
    {
      name: '__component:badge-column',
      title: '',
      dataClass: 'text-center',
      width: '4%',
    },
    {
      name: 'title',
      sortField: 'title',
      width: '20%',
    },
    {
      name: 'url',
      sortField: 'url',
      width: '24%',
    },
    {
      name: 'isHoax',
      title: 'Status Hoax',

    },
    {
      name: 'reporter',
      title: 'Pelapor',
      width: '10%',
    },
    '__slot:actions'
  ],
  sortFunctions: {
    'url': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    },
    'email': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    },
  },
}

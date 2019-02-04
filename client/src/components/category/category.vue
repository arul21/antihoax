<template>
    <div>
        <!-- Modal Edit -->
        <vuestic-modal :show.sync="show"
            v-bind:small="true" v-bind:force="true" ref="staticModal"
            :noButtons="true"
            :okText="'modal.confirm' | translate">
            <div slot="title">{{'Edit Category' | translate}}</div>
            <div class="text-center">
                <label for="exampleInputEmail1">Category</label>
                <input type="text" class="form-control" v-model="editCategory.category" autofocus>
            </div><hr>
            <div class="text-center" >
                <button type="button" class="btn btn-micro" @click.prevent="save">Save</button>
            </div>
        </vuestic-modal>
        <!-- end modal edit -->

        <!-- Modal add -->
        <vuestic-modal :show.sync="show"
            v-bind:small="true" v-bind:force="true" ref="addCat"
            :noButtons="true"
            :okText="'modal.confirm' | translate">
            <div slot="title">{{'Add Category' | translate}}</div>
            <div class="text-center">
                <label for="exampleInputEmail1">Category</label>
                <input type="text" autofocus class="form-control" v-model="category" >
            </div><hr>
            <div class="text-center" >
                <button type="button" class="btn btn-success btn-micro" @click.prevent="saveCategory">Save</button>
            </div>
        </vuestic-modal>
        <!-- end modal add -->

        <div class="va-row">
            <div class="flex md12 xs12">
                <vuestic-widget :headerText="$t('Manage Category')">
                    <button class="btn btn-primary btn-micro" @click.prevent="addCat">add category</button>
                    <vuestic-data-table
                        ref="category"
                        :apiUrl="apiUrl"
                        :tableFields="tableFields"
                        :itemsPerPage="itemsPerPage"
                        :defaultPerPage="defaultTablePerPage"
                        :sortFunctions="sortFunctions"
                        :apiMode="apiMode"
                        :paginationPath="paginationPath"
                        :queryParams="queryParams"
                        :editRow="editRow"
                        :deleteRow="deleteRow"
                        
                    >
                        <spring-spinner
                        slot="loading"
                        :animation-duration="2500"
                        :size="70"
                        color="#4ae387"
                        />
                        
                    </vuestic-data-table>
                </vuestic-widget>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import BadgeColumn from './BadgeColumn.vue'
import QueryParams from '../../vuestic-theme/vuestic-components/vuestic-datatable/data/query-params'
import { SpringSpinner } from 'epic-spinners'
import {mapActions, mapState} from 'vuex'
import swal from 'sweetalert';
import axios from 'axios'

// const baseUrl = `http://localhost:3000`
const baseUrl = `http://35.240.200.66`
Vue.component('badge-column', BadgeColumn)

export default {
    name: 'category',
    components: {
        SpringSpinner,
    },
    methods: {

    },
    computed: {
        ...mapState(['data'])
    },
    data () {
        return {
            apiUrl: 'http://35.240.200.66/category/api',
            apiMode: true,
            defaultTablePerPage: 30,
            queryParams: QueryParams,
            tableFields: [{
                name: 'category', // Object property name in your data e.g. (data[0].name)
                sortField: 'category', // Object property name in your data which will be used for sorting
            },{
                name: 'createdAt',
                title: 'Last Update'
            },'__slot:actions',
            ],
            itemsPerPage: [{  // values in dropdown "Items Per Page"
                value: 5
            },
            {
                value: 6
            },
            {
                value: 10
            }],
            sortFunctions: {       // use custom sorting functions for prefered fields
                'category': function (item1, item2) {
                    return item1 >= item2 ? 1 : -1
                },
                'category': function (item1, item2) {
                    return item1 >= item2 ? 1 : -1
                }
            },
            paginationPath: '',
            show: true,
            editCategory: {},
            category:''
        }
    },
    methods: {
        ...mapActions(['updateCategory', 'addCategory']),

        editRow(rowData){
            this.showStaticModal(rowData)
            this.editCategory = rowData
            this.$refs.category.ontime()
        },

        deleteRow(rowData){
            swal({
                title: "Are you sure?",
                text: "remove this data?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then(willDelete => {
                if (willDelete) {
                    axios({
                        method: 'DELETE',
                        url: baseUrl+`/category/${rowData._id}`
                    })
                    .then(response =>{
                        this.$refs.category.ontime()
                        swal("Data has been removed!", {
                            icon: "success",
                        });
                    })

                }else {
                    swal(`Data is safe!`);
                }
            })
            .catch(err =>{
                console.log(err);
            })
        },
        
        
        showStaticModal(id) {
            this.$refs.staticModal.open()
        },

        save(){
            let data = this.editCategory
            this.updateCategory(data)
            this.$refs.staticModal.close()
        },

        addCat(){
            this.$refs.addCat.open()
        },

        saveCategory(){
            let data = {category: this.category}
            this.addCategory(data)
            this.$refs.addCat.close()
            this.category = ''
            this.$refs.category.ontime()
        },

        onUpdate() {
            this.$refs.category.ontime()
        }
    },
}
</script>

<style lang="scss" >
.color-icon-label-table {
    td:first-child {
        width: 1rem;
    }
}
.modals-page {
  .modals-list {
    .btn {
      margin-right: 20px;
      margin-bottom: 25px;
    }
  }
}

</style>









<template>
    <div>
        <!-- Modal Edit -->
        <vuestic-modal :show.sync="show" ref="mediumModal"
            :okText="'modal.confirm' | translate"
            :noButtons="true"
            :cancelText="'modal.cancel' | translate">
            <div slot="title">{{'Update Data Report' | translate}}</div>
            <div>
                <div class="modal-body">
                    <label >Title</label><br>
                    <input type="text" class="form-control" id="exampleFormControlInput1" v-model="editReport.title" disabled><hr>
                  
                  
                    <label for="exampleFormControlInput2">URL</label>
                    <input type="text" class="form-control" id="exampleFormControlInput2" v-model="editReport.url" disabled><hr>
                  
                  
                    <label for="exampleFormControlInput3">Category</label>
                    <select class="form-control" v-model="editReport.category" autofocus>
                        <option class="text-center" v-for="category in categories" :key=category._id :value="category._id"> {{ category.category }} </option>
                    </select><hr>
                  
                  
                    <label for="exampleFormControlInput3">Pelapor</label>
                    <input type="text" class="form-control" id="exampleFormControlInput3" v-model="editReport.reporter" disabled><hr>
                  
                  
                    <label for="exampleFormControlInput4">Email</label>
                    <input type="text" class="form-control" id="exampleFormControlInput4" v-model="editReport.email" disabled>
                </div>
                <div class="text-center" >
                <button type="button" class="btn btn-primary btn-micro" @click.prevent="saveUpdate">Save</button>&nbsp; &nbsp;
                <button type="button" class="btn btn-primary btn-micro" @click.prevent="verify">Verify</button>
            </div>
            </div>
        </vuestic-modal>
        <!-- modal Verify -->
        <vuestic-modal :show.sync="show" ref="verifyURL"
            :okText="'modal.confirm' | translate"
            :noButtons="true"
            :cancelText="'modal.cancel' | translate">
            <div slot="title">{{'Verify URL Report' | translate}}</div>
            <div>
                <div class="modal-body">
                    <div class="card">
                    <table class="table table-striped">
                        <tbody>
                             <tr>
                                <th scope="row">Title</th>
                                <td>{{editReport.title}}</td>
                            </tr>
                            <tr>
                                <th scope="row">URL</th>
                                <td>{{editReport.url}}</td>
                            </tr>
                            <tr>
                                <th scope="row">Pelapor</th>
                                <td>{{editReport.reporter}}</td>
                            </tr>
                            <tr>
                                <th scope="row">Email</th>
                                <td>{{editReport.email}}</td>
                            </tr>
                            <tr>
                                <th scope="row">Status</th>
                                <td>{{editReport.status}}</td>
                            </tr>
                        </tbody>
                    </table> 
                    </div>
                </div>
                <div class="text-center" >
                <button type="button" class="btn btn-primary btn-micro" @click.prevent="verified">Verify</button>&nbsp; &nbsp;
                
            </div>
            </div>
        </vuestic-modal>


        <div class="va-row">
            <div class="flex md12 xs12">
                <vuestic-widget :headerText="$t('Manage Report Unverified')">
                    <vuestic-data-table
                        ref="reportUnverified"
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
                <unverified/>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import BadgeColumn from './BadgeColumn.vue'
import QueryParams from '../../vuestic-theme/vuestic-components/vuestic-datatable/data/query-params'
import { SpringSpinner } from 'epic-spinners'
import FieldsDef from './tablefields.js'
import ItemsPerPageDef from './item-perPage.js'
import {mapActions, mapState} from 'vuex'
import queryParams from '../../vuestic-theme/vuestic-components/vuestic-datatable/data/query-params';
import Unverified from './unverified.vue'
import swal from 'sweetalert';
import axios from 'axios'

const baseUrl = `http://localhost:3000`
Vue.component('badge-column', BadgeColumn)
export default {
    name: 'Report',
    components: {
        SpringSpinner, Unverified
    },
    computed: {
        ...mapState(['categories'])
    },
    data() {
        return {
            apiUrl: `http://localhost:3000/report/unverify`,
            apiMode: true,
            tableFields: FieldsDef.tableFields,
            sortFunctions: FieldsDef.sortFunctions,
            itemsPerPage: ItemsPerPageDef.itemsPerPage,
            paginationPath: '',
            defaultTablePerPage: 6,
            queryParams: QueryParams,
            show: false,
            editReport: {}
        }
    },

    methods: {
        ...mapActions(['saveReport', 'verifyData']),
        editRow(rowData){
            this.editReport = rowData
            this.$refs.mediumModal.open()
            // console.log(`ini data`, this.editReport);
        },

        saveUpdate(){
            if(this.editReport.category === ''){
                swal(`please input inccorect`)
            } else {
                let cat = this.editReport
                this.saveReport(cat)
                this.onUpdate()
                this.$refs.mediumModal.close()

            }
        },

        onUpdate() {
            this.$refs.reportUnverified.ontime()
            this.$refs.reportVerified.ontime()
        },

        verify(){
            this.$refs.mediumModal.close()
            this.$refs.verifyURL.open()
        },

        verified(){
            let verif = this.editReport
            swal({
                title: "Are you sure?",
                text: "this link contains negative content?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then(verify => {
              if (verify) {
                axios({
                  method: 'PATCH',
                  url: baseUrl+`/report/verify/${verif._id}`
                })
                .then(response =>{
                    // this.$refs.reportVerified.ontime()
                    this.$refs.reportUnverified.ontime()
                    swal("Successfully Verify", {
                        icon: "success",
                    });
                    this.$refs.verifyURL.close()
                })
            }else {
                swal(`Verify Cancel`);
                this.$refs.verifyURL.close()
              }
            })
            .catch(err =>{
                console.log(err);
            })   
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
                        url: baseUrl+`/report/${rowData._id}`
                    })
                    .then(response =>{
                        this.onUpdate()
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
    },
    mounted() {
        this.$store.dispatch('getAllCategory')
    },
}
</script>

<style lang="scss">
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


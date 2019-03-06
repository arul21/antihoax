<template>
    <div>
        <vuestic-modal :show.sync="show" ref="unverifyURL"
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
                                <td>{{report.title}}</td>
                            </tr>
                            <tr>
                                <th scope="row">URL</th>
                                <td>{{report.url}}</td>
                            </tr>
                            <tr>
                                <th scope="row">Pelapor</th>
                                <td>{{report.reporter}}</td>
                            </tr>
                            <tr>
                                <th scope="row">Email</th>
                                <td>{{report.email}}</td>
                            </tr>
                            <tr>
                                <th scope="row">Status</th>
                                <td>{{report.status}}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <label for="">Keterangan</label>
                        <input type="text" class="form-control" autofocus v-model="keterangan" ><hr>
                </div>
                <div class="text-center" >
                <button type="button" class="btn btn-primary btn-micro" @click.prevent="unverified">Unverified</button>
            </div>
            </div>
        </vuestic-modal>

        <!-- view verify -->
        <vuestic-modal :show.sync="show" ref="viewVerify"
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
                                <td>{{report.title}}</td>
                            </tr>
                            <tr>
                                <th scope="row">URL</th>
                                <td>{{report.url}}</td>
                            </tr>
                            <tr>
                                <th scope="row">Pelapor</th>
                                <td>{{report.reporter}}</td>
                            </tr>
                            <tr>
                                <th scope="row">Email</th>
                                <td>{{report.email}}</td>
                            </tr>
                            <tr>
                                <th scope="row">Note</th>
                                <td>{{report.keterangan}}</td>
                            </tr>
                            <tr>
                                <th scope="row">Status Hoax</th>
                                <td>{{report.isHoax}}</td>
                            </tr>
                            <tr>
                                <th scope="row">Status</th>
                                <td>{{report.status}}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </vuestic-modal>

        <div class="va-row">
            <div class="flex md12 xs12">
                <vuestic-widget :headerText="$t('Manage Report Verified')">
                    <vuestic-data-table
                        ref="reportVerified"
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
                        :viewRow="viewData"
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
import FieldsDef from './tablefieldsss.js'
import ItemsPerPageDef from './item-perPage.js'
import { mapActions, mapState } from 'vuex'
import queryParams from '../../vuestic-theme/vuestic-components/vuestic-datatable/data/query-params'
import axios from 'axios'
import swal from 'sweetalert'
// const baseUrl = `http://localhost:3000`
const baseUrl = `https://stophoax.arul21.com`
Vue.component('badge-column', BadgeColumn)
export default {
  name: 'Verified',
  components: {
    SpringSpinner,
  },
  data () {
    return {
      apiUrl: baseUrl + `/report/verify`,
      apiMode: true,
      tableFields: FieldsDef.tableFields,
      sortFunctions: FieldsDef.sortFunctions,
      itemsPerPage: ItemsPerPageDef.itemsPerPage,
      paginationPath: '',
      defaultTablePerPage: 6,
      queryParams: QueryParams,
      show: false,
      report: {},
      keterangan: ''
    }
  },

  methods: {
    editRow (rowData) {
      this.$refs.unverifyURL.open()
      this.report = rowData
    },
    onUpdate () {
      this.$refs.reportVerified.ontime()
    },

    viewData (rowData) {
      this.$refs.viewVerify.open()
      this.report = rowData
    },

    deleteRow (rowData) {
      swal({
        title: 'Are you sure?',
        text: 'remove this data?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then(willDelete => {
          if (willDelete) {
            axios({
              method: 'DELETE',
              url: baseUrl + `/report/${rowData._id}`
            })
              .then(response => {
                this.onUpdate()
                swal('Data has been removed!', {
                  icon: 'success',
                })
              })
          } else {
            swal(`Data is safe!`)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    unverified (rowData) {
      let verif = this.report
      swal({
        title: 'Are you sure?',
        text: 'this link contains negative content?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then(verify => {
          if (verify) {
            axios({
              method: 'PATCH',
              url: baseUrl + `/report/unverify/${verif._id}`,
              data: {
                keterangan: this.keterangan
              }
            })
              .then(response => {
                swal('Successfully Verify', {
                  icon: 'success',
                })
                this.$refs.unverifyURL.close()
                this.onUpdate()
              })
          } else {
            swal(`Verify Cancel`)
            this.$refs.unverifyURL.close()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
}
</script>

<style>

</style>

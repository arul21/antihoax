<template>
    <div>
        <div class="va-row">
            <div class="flex md12 xs12">
                <vuestic-widget :headerText="$t('All URL Data')">
                    <vuestic-data-table
                        ref="dashboard"
                        :apiUrl="apiUrl"
                        :tableFields="tableFields"
                        :itemsPerPage="itemsPerPage"
                        :defaultPerPage="defaultTablePerPage"
                        :sortFunctions="sortFunctions"
                        :apiMode="apiMode"
                        :paginationPath="paginationPath"
                        :queryParams="queryParams"
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

Vue.component('badge-column', BadgeColumn)
const baseUrl = `http://35.240.200.66`
export default {
    name: 'Tables',
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
            apiUrl: `http://35.240.200.66/report`,
            apiMode: true,
            defaultTablePerPage: 10,
            queryParams: QueryParams,
            tableFields: [{
                name: 'title', // Object property name in your data e.g. (data[0].name)
                sortField: 'title' // Object property name in your data which will be used for sorting
            },{
                name: 'url',
                sortField: 'url' // Title of column
            },{
                name: 'category.category',
                title: 'category'
            },{
                name: 'reporter',
                title: 'pelapor'
            },{
                name: 'email',
                sortField: 'email'
            },{
                name: 'status',
                title: 'status'
            }],
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
                'name': function (item1, item2) {
                    return item1 >= item2 ? 1 : -1
                },
                'email': function (item1, item2) {
                    return item1 >= item2 ? 1 : -1
                }
            },
            paginationPath: ''
        }
    },
    created() {
        this.$store.dispatch('getData')
    },
}
</script>

<style lang="scss">
.color-icon-label-table {
    td:first-child {
        width: 1rem;
    }
}
</style>

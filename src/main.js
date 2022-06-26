import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/reset.css'
import { ElButton, ElInput,ElCarousel,ElCarouselItem,ElContainer, ElAside, ElHeader,ElMain ,ElTabs,ElTabPane, ElImage, 
        ElTag,ElTooltip, ElAffix, ElPagination,ElButtonGroup, ElDialog, ElTable, ElTableColumn, ElForm, ElFormItem,
        ElCol, ElDropdown, ElDropdownItem, ElDropdownMenu, ElScrollbar,ElLoading
} from 'element-plus'
import 'element-plus/dist/index.css'
createApp(App)
        .use(ElButton).use(ElInput).use(ElCarousel).use(ElCarouselItem).use(ElContainer).use(ElAside).use(ElHeader)
        .use(ElMain) .use(ElTabs).use(ElImage).use(ElTag).use(ElTabPane).use(ElTooltip).use(ElAffix).use(ElPagination)
        .use(ElButtonGroup).use(ElTable).use(ElTableColumn).use(ElDialog).use(ElForm).use(ElFormItem).use(ElCol)
        .use(ElDropdown).use(ElDropdownItem).use(ElDropdownMenu).use(ElScrollbar).use(ElLoading)
        .use(store).use(router).mount('#app')

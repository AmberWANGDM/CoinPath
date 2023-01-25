import { AxiosResponse } from "axios"
import { onMounted, ref } from "vue"

type Fetcher = (page: number) => Promise<AxiosResponse<Resources<Tag>>>

export const useTags = (fetcher: Fetcher) => {
  const page = ref<number>(0)
  const hasMore = ref(false) // 是否有下一页
  const tags = ref<Tag[]>([])

  const fetchTags = async () => {
    // 向服务器或mock请求tags
    const response = await fetcher(page.value)
    const { resources, pager } = response.data
    // 更新tags
    tags.value.push(...resources)
    // 是否还有下一页
    hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
    // 更新page
    page.value += 1
  }
  onMounted(fetchTags)

  return {
    page,
    hasMore,
    tags,
    fetchTags
  }
}
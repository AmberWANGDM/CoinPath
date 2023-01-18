import { defineComponent, reactive } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Button } from '../../shared/Button/Button';
import { Icon } from '../../shared/Icon/Icon';
import { TagForm } from './TagForm';
import s from './Tag.module.scss';

export const TagEdit = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>{{
        title: () => '编辑标签',
        icon: () => <Icon name='back' onClick={() => { }} />,
        default: () =>
          <>
            <TagForm />
            <div class={s.actions}>
              <Button class={s.removeTags} level='danger' onClick={() => { }}>删除标签</Button>
              <Button class={s.removeTagsAndItems} level='danger' onClick={() => { }}>删除标签和记账</Button>
            </div>
          </>
      }}</MainLayout>
    )
  }
})
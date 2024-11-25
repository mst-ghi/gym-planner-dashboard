'use client';

import { Page } from '@/components/shell';
import { IconPlus } from '@tabler/icons-react';
import { StatusBadge } from '@/components/common';
import { PostStatusDic } from '@/utils/dictionary';
import { formatDate, truncateText } from '@/utils';
import { Badge, Button, Flex, Text } from '@mantine/core';
import { PostForm, useFetchPosts } from '@/features/posts';
import { closeAllModals, openModal } from '@mantine/modals';
import { Datatable, useDatatable } from '@/components/datatable';

export default function PostsPage() {
  const { states, pageProps, takeProps, searchProps } = useDatatable();
  const { data, isLoading, isFetching, refetch } = useFetchPosts({ ...states, none: true });

  const openDialogForm = (post?: IPost) => {
    openModal({
      size: 'lg',
      closeOnClickOutside: false,
      closeOnEscape: false,
      title: post ? 'Edit Post' : 'Add Post',
      children: (
        <PostForm
          post={post}
          done={() => {
            refetch();
            closeAllModals();
          }}
        />
      ),
    });
  };

  return (
    <Page
      title='Posts'
      loading={isLoading}
      rightSection={
        <Button leftSection={<IconPlus />} onClick={() => openDialogForm()}>
          Add Post
        </Button>
      }
    >
      <Datatable
        loading={isFetching}
        records={data?.posts}
        paginationProps={{
          refetch,
          meta: data?.meta,
          pageProps,
          takeProps,
          searchProps,
        }}
        columns={[
          {
            accessor: 'owner',
            title: 'Author',
            render: (post) => {
              return <Text size='sm'>{post.owner.fullname}</Text>;
            },
          },
          { accessor: 'title', title: 'Title' },
          {
            accessor: 'content',
            title: 'Content',
            render: (post) => {
              return <Text size='sm'>{truncateText(post.content, 80)}</Text>;
            },
          },
          {
            accessor: 'tags',
            title: 'Tags',
            width: 160,
            render: (post) => {
              return post.tags.split('|').map((tag, idx) => {
                return (
                  <Badge key={`${tag}-${idx}-${post.id}`} color='blue' size='sm'>
                    {tag}
                  </Badge>
                );
              });
            },
          },

          {
            accessor: 'likes',
            title: 'Likes Count',
            render: (post) => {
              return <Text size='sm'>{post.likes.length} likes</Text>;
            },
          },
          {
            accessor: 'created_at',
            title: 'Created At',
            render: (post) => {
              return <Text size='sm'>{formatDate(post.created_at)}</Text>;
            },
          },
          {
            accessor: 'status',
            title: 'Status',
            render: (post) => {
              return <StatusBadge status={post.status} label={PostStatusDic[post.status]} />;
            },
          },

          {
            accessor: 'actions',
            title: '',
            render: (post) => {
              return (
                <Flex direction='row' align='center' gap='xs' w='100%' justify='center'>
                  <Button size='xs' onClick={() => openDialogForm(post)}>
                    Edit
                  </Button>
                </Flex>
              );
            },
          },
        ]}
      />
    </Page>
  );
}

<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { Row, Column } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import { useClipboard } from '@vueuse/core'
/* import { upperFirst } from 'scule' */

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const toast = useToast()
const { copy } = useClipboard()

const { locale } = useI18n()
const table = useTemplateRef('table')

type Translation = {
  id: string
  date?: string
  original: string
  translated?: string
  letters: number
  status: 'finished' | 'proofread' | 'empty'
  comments?: string[]
}
const data = ref<Translation[]>([
  {
    id: '4600',
    date: '2024-03-11T15:30:00',
    original: 'james.anderson',
    translated: 'Yes',
    letters: 594,
    status: 'finished'
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    original: 'mia.white',
    translated: 'Yes',
    letters: 276,
    status: 'proofread',
    comments: ['no', 'way']
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    original: 'william.brown',
    translated: 'Yes',
    letters: 401,
    status: 'empty'
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    original: 'emma.davis',
    translated: 'Yes',
    letters: 529,
    status: 'finished'
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    original: 'ethan.harris',
    translated: 'Yes',
    letters: 639,
    status: 'finished'
  },
  {
    id: '4595',
    date: '2024-03-10T13:20:00',
    original: 'sophia.miller',
    translated: 'Yes',
    letters: 428,
    status: 'finished'
  },
  {
    id: '4594',
    date: '2024-03-10T11:05:00',
    original: 'noah.wilson',
    translated: 'Yes',
    letters: 673,
    status: 'finished'
  },
  {
    id: '4593',
    date: '2024-03-09T22:15:00',
    original: 'olivia.jones',
    translated: 'Yes',
    letters: 382,
    status: 'finished'
  },
  {
    id: '4592',
    date: '2024-03-09T20:30:00',
    original: 'liam.taylor',
    translated: 'Yes',
    letters: 547,
    status: 'finished'
  },
  {
    id: '4591',
    date: '2024-03-09T18:45:00',
    original: 'ava.thomas',
    translated: 'Yes',
    letters: 291,
    status: 'finished'
  },
  {
    id: '4590',
    date: '2024-03-09T16:20:00',
    original: 'lucas.martin',
    translated: 'Yes',
    letters: 624,
    status: 'finished'
  },
  {
    id: '4589',
    date: '2024-03-09T14:10:00',
    original: 'isabella.clark',
    translated: 'Yes',
    letters: 438,
    status: 'finished'
  },
  {
    id: '4588',
    date: '2024-03-09T12:05:00',
    original: 'mason.rodriguez',
    translated: 'Yes',
    letters: 583,
    status: 'finished'
  },
  {
    id: '4587',
    date: '2024-03-09T10:30:00',
    original: 'sophia.lee',
    translated: 'Yes',
    letters: 347,
    status: 'finished'
  },
  {
    id: '4586',
    date: '2024-03-09T08:15:00',
    original: 'ethan.walker',
    translated: 'Yes',
    letters: 692,
    status: 'finished'
  },
  {
    id: '4585',
    date: '2024-03-08T23:40:00',
    original: 'amelia.hall',
    translated: 'Yes',
    letters: 419,
    status: 'finished'
  },
  {
    id: '4584',
    date: '2024-03-08T21:25:00',
    original: 'oliver.young',
    translated: 'Yes',
    letters: 563,
    status: 'finished'
  },
  {
    id: '4583',
    date: '2024-03-08T19:50:00',
    original: 'aria.king',
    translated: 'Yes',
    letters: 328,
    status: 'finished'
  },
  {
    id: '4582',
    date: '2024-03-08T17:35:00',
    original: 'henry.wright',
    translated: 'Yes',
    letters: 647,
    status: 'finished'
  },
  {
    id: '4581',
    date: '2024-03-08T15:20:00',
    original: 'luna.lopez',
    translated: 'Yes',
    letters: 482,
    status: 'finished'
  }
])
const columns: TableColumn<Translation>[] = [
  {
    id: 'expand',
    cell: ({ row }) =>
      h(UButton, {
        'color': 'neutral',
        'variant': 'ghost',
        'icon': 'i-lucide-chevron-down',
        'square': true,
        'aria-label': 'Expand',
        'ui': {
          leadingIcon: [
            'transition-transform',
            row.getIsExpanded() ? 'duration-200 rotate-180' : ''
          ]
        },
        'onClick': () => row.toggleExpanded()
      })
  },
  {
    accessorKey: 'id',
    header: ({ column }) => getHeader(column, 'ID'),
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'status',
    header: ({ column }) => getHeader(column, $t('translation.status')),
    cell: ({ row }) => {
      const color = {
        finished: 'success' as const,
        proofread: 'info' as const,
        empty: 'neutral' as const
      }[row.getValue('status') as string]
      const icon = {
        finished: 'lucide-check' as const,
        proofread: 'lucide-eye' as const,
        empty: 'lucide-circle' as const
      }[row.getValue('status') as string]
      const label = {
        finished: $t('translation.finished'),
        proofread: $t('translation.proofread'),
        empty: $t('translation.empty')
      }[row.getValue('status') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color, icon, label })
    }
  },
  {
    accessorKey: 'letters',
    header: ({ column }) => getHeader(column, $t('translation.letters')),
    cell: ({ row }) => {
      const letters = Number.parseFloat(row.getValue('letters'))
      return letters
    }
  },
  {
    accessorKey: 'date',
    header: ({ column }) => getHeader(column, $t('translation.date')),
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString(locale.value, {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    accessorKey: 'original',
    header: ({ column }) => getHeader(column, $t('translation.original')),
    meta: {
      class: {
        td: 'text-start text-toned font-medium'
      }
    }
  },
  {
    accessorKey: 'translated',
    header: ({ column }) => getHeader(column, $t('translation.result')),
    meta: {
      class: {
        td: 'text-highlighted font-medium'
      }
    }
  },
  {
    id: 'actions',
    meta: {
      class: {
        td: 'text-end'
      }
    },
    cell: ({ row }) => {
      return h(
        UDropdownMenu,
        {
          'content': {
            align: 'end'
          },
          'items': getRowItems(row),
          'aria-label': 'Actions dropdown'
        },
        () =>
          h(UButton, {
            'icon': 'i-lucide-ellipsis-vertical',
            'color': 'neutral',
            'variant': 'ghost',
            'aria-label': 'Actions dropdown'
          })
      )
    }
  }
]

function getRowItems(row: Row<Translation>) {
  return [
    {
      type: 'label',
      label: $t('translation.actions')
    },
    {
      label: $t('translation.copy'),
      icon: 'i-lucide-copy',
      onSelect() {
        copy(row.original.id)

        toast.add({
          title: $t('translation.copied'),
          color: 'success',
          icon: 'i-lucide-circle-check'
        })
      }
    },
    {
      type: 'separator'
    },
    {
      label: $t('translation.proofread'),
      icon: 'i-lucide-eye'
    },
    {
      label: $t('translation.comment'),
      icon: 'i-lucide-message-circle'
    },
    {
      label: $t('translation.details'),
      icon: 'i-lucide-info'
    }
  ]
}

function getHeader(column: Column<Translation>, label: string) {
  const isSorted = column.getIsSorted()

  return h(
    UDropdownMenu,
    {
      'content': {
        align: 'start'
      },
      'aria-label': 'Actions dropdown',
      'items': [
        {
          label: $t('translation.asc'),
          type: 'checkbox',
          icon: 'i-lucide-arrow-up-narrow-wide',
          checked: isSorted === 'asc',
          onSelect: () => {
            if (isSorted === 'asc') {
              column.clearSorting()
            } else {
              column.toggleSorting(false)
            }
          }
        },
        {
          label: $t('translation.desc'),
          icon: 'i-lucide-arrow-down-wide-narrow',
          type: 'checkbox',
          checked: isSorted === 'desc',
          onSelect: () => {
            if (isSorted === 'desc') {
              column.clearSorting()
            } else {
              column.toggleSorting(true)
            }
          }
        }
      ]
    },
    () =>
      h(UButton, {
        'color': 'neutral',
        'variant': 'ghost',
        label,
        'icon': isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        'class': '-mx-2.5 data-[state=open]:bg-elevated',
        'aria-label': `Sort by ${isSorted === 'asc' ? 'descending' : 'ascending'}`
      })
  )
}

const sorting = ref([
  {
    id: 'id',
    desc: false
  }
])

const pagination = ref({
  pageIndex: 0,
  pageSize: 5
})
const globalFilter = ref('')
const expanded = ref({ 1: true })
const columnVisibility = ref({
  id: false,
  expand: false
})
</script>

<template>
  <div class="w-full space-y-4 pb-4">
    <div class="flex justify-between px-4 py-3.5 border-b border-accented">
      <UInput v-model="globalFilter" class="max-w-sm" :placeholder="$t('translation.filter')" />
      <!-- <UDropdownMenu
        :items="
          table?.tableApi
            ?.getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => ({
              label: upperFirst(column.id),
              type: 'checkbox' as const,
              checked: column.getIsVisible(),
              onUpdateChecked(checked: boolean) {
                table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
              },
              onSelect(e: Event) {
                e.preventDefault()
              }
            }))
        "
        :content="{ align: 'end' }"
      >
        <UButton
          :label="$t('translation.columns')"
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-chevron-down"
        />
      </UDropdownMenu> -->
    </div>

    <UTable
      ref="table"
      v-model:pagination="pagination"
      v-model:global-filter="globalFilter"
      v-model:expanded="expanded"
      v-model:sorting="sorting"
      v-model:column-visibility="columnVisibility"
      :data="data"
      :columns="columns"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
      }"
      class="flex-1"
      :ui="{ tr: 'data-[expanded=true]:bg-elevated/50' }"
    >
      <!-- <template #expanded="{ row }">
        <div class="flex flex-col items-center justify-center gap-4">
          <div v-for="comment in row.original.comments" :key="comment" class="flex flex-row gap-2">
            <UUser
              :name="comment"
              :description="row.original.original"
              :avatar="{
                src: '/cat.png',
                icon: 'i-lucide-user'
              }"
            />
          </div>
        </div>
      </template> -->
    </UTable>
    <div class="flex justify-end border-t border-default pt-4 px-4">
      <UPagination
        :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v'

type AddOn = {
  id: string
  name: string
  description: string
  price: number
  period: string
  category: string
  isMultiple: boolean
  maxQuantity?: number
  icon?: string
}

type CartItem = AddOn & {
  quantity: number
}

type AddOnsMarketplaceProps = {
  addOns?: AddOn[]
}

const defaultAddOns: AddOn[] = [
  {
    id: '1',
    name: 'Extra Page',
    description: 'Add additional pages to your website',
    price: 10,
    period: 'month',
    category: 'Content',
    isMultiple: true,
    maxQuantity: 50,
    icon: '📄'
  },
  {
    id: '2',
    name: 'Custom Domain',
    description: 'Connect your own domain name',
    price: 15,
    period: 'month',
    category: 'Domain',
    isMultiple: false,
    icon: '🌐'
  },
  {
    id: '3',
    name: 'SSL Certificate',
    description: 'Secure your website with SSL encryption',
    price: 5,
    period: 'month',
    category: 'Security',
    isMultiple: false,
    icon: '🔒'
  },
  {
    id: '4',
    name: 'Email Account',
    description: 'Professional email accounts for your domain',
    price: 8,
    period: 'month',
    category: 'Email',
    isMultiple: true,
    maxQuantity: 20,
    icon: '📧'
  },
  {
    id: '5',
    name: 'Analytics Pro',
    description: 'Advanced analytics and reporting features',
    price: 25,
    period: 'month',
    category: 'Analytics',
    isMultiple: false,
    icon: '📊'
  },
  {
    id: '6',
    name: 'Storage Upgrade',
    description: 'Additional 10GB storage space',
    price: 3,
    period: 'month',
    category: 'Storage',
    isMultiple: true,
    maxQuantity: 100,
    icon: '💾'
  },
  {
    id: '7',
    name: 'Priority Support',
    description: '24/7 priority customer support',
    price: 20,
    period: 'month',
    category: 'Support',
    isMultiple: false,
    icon: '🎧'
  },
  {
    id: '8',
    name: 'Backup Service',
    description: 'Daily automated backups',
    price: 12,
    period: 'month',
    category: 'Security',
    isMultiple: false,
    icon: '💿'
  }
]

const props = defineProps<AddOnsMarketplaceProps>()
const cart = reactive<CartItem[]>([])
const selectedCategory = ref<string>('All')
const categories = computed<string[]>(() => {
  const addons = props.addOns ?? defaultAddOns
  const cats = new Set<string>(addons.map(a => a.category))
  return ['All', ...Array.from(cats)]
})
const filteredAddOns = computed(() => {
  const addOns = props.addOns ?? defaultAddOns
  return selectedCategory.value === 'All'
    ? addOns
    : addOns.filter((a: { category: string }) => a.category === selectedCategory.value)
})

function addToCart(addOn: AddOn) {
  const existing = cart.find(c => c.id === addOn.id)
  if (existing) {
    if (addOn.isMultiple && (!addOn.maxQuantity || existing.quantity < addOn.maxQuantity)) {
      existing.quantity += 1
    }
  } else {
    cart.push({ ...addOn, quantity: 1 })
  }
}
function removeFromCart(addOnId: string) {
  const idx = cart.findIndex(c => c.id === addOnId)
  if (idx !== -1) cart.splice(idx, 1)
}

function updateQuantity(addOnId: string, delta: number) {
  const item = cart.find(c => c.id === addOnId)
  if (!item) return
  const newQty = item.quantity + delta
  if (newQty <= 0) return
  if (item.maxQuantity && newQty > item.maxQuantity) return
  item.quantity = newQty
}

const totalItems = computed(() => cart.reduce((s, i) => s + i.quantity, 0))
const totalPrice = computed(() => cart.reduce((s, i) => s + i.price * i.quantity, 0))

const getCartItem = (id: AddOn['id']) => cart.find(i => i.id === id)
const isInCart = (addon: AddOn) => !!getCartItem(addon.id)
const canAddMore = (addon: AddOn) => {
  const existing = getCartItem(addon.id)
  if (!existing) return !addon.maxQuantity || addon.maxQuantity > 0
  if (!addon.isMultiple) return false
  if (addon.maxQuantity && existing.quantity >= addon.maxQuantity) return false
  return true
}
/*
function AddOnsMarketplace({ addOns = defaultAddOns }: AddOnsMarketplaceProps) {
  const cart = ref<CartItem[]>([])
  const selectedCategory = ref<string>('All')

  const categories = [
    'All',
    ...Array.from(new Set(addOns.map(addon => addon.category))),
  ]

  const filteredAddOns = selectedCategory.value === 'All'
      ? addOns
      : addOns.filter(addon => addon.category === selectedCategory.value)

  const addToCart = (addOn: AddOn) => {
    setCart((currentCart: any[]) => {
      const existingItem = currentCart.find(item => item.id === addOn.id)

      if (existingItem) {
        if (
          addOn.isMultiple &&
          (!addOn.maxQuantity || existingItem.quantity < addOn.maxQuantity)
        ) {
          return currentCart.map(item =>
            item.id === addOn.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
        return currentCart
      }

      return [...currentCart, { ...addOn, quantity: 1 }]
    })
  }

  const removeFromCart = (addOnId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== addOnId))
  }

  const updateQuantity = (addOnId: string, delta: number) => {
    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.id === addOnId) {
          const newQuantity = item.quantity + delta
          if (newQuantity <= 0) return item
          if (item.maxQuantity && newQuantity > item.maxQuantity) return item
          return { ...item, quantity: newQuantity }
        }
        return item
      })
    )
  }

  const getCartItem = (addOnId: string) => {
    return cart.find((item) => item.id === addOnId)
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
} */
</script>

<template>
  <div class="w-full max-w-7xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">
        Add-Ons Marketplace
      </h1>
      <p class="text-muted">
        Enhance your plan with powerful add-ons
      </p>
    </div>

    <div class="flex gap-8">
      <div class="flex-1">
        <div class="mb-6">
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="category in categories"
              :key="category"
              :variant="selectedCategory === category ? 'soft' : 'outline'"
              size="sm"
              :class="{ active: selectedCategory === category }"
              class="text-xs"
              :label="category"
              @click="selectedCategory = category"
            />
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div
            v-for="addOn in filteredAddOns"
            :key="addOn.id"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.3 }"
            class="group relative p-6 rounded-xl border transition-all duration-200 hover:bg-radial from-primary/20 border-muted hover:border-muted/80"
            :class="isInCart(addOn) && 'ring-2 ring-primary/20 border-primary/30'"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="text-2xl">
                  {{ addOn.icon }}
                </div>
                <div>
                  <h3 class="font-semibold">
                    {{ addOn.name }}
                  </h3>
                  <span class="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {{ addOn.category }}
                  </span>
                </div>
              </div>
              <Icon v-if="!addOn.isMultiple && isInCart(addOn)" name="lucide-check" class="size-5 text-primary" />
            </div>
            <p class="text-sm text-muted mb-4 line-clamp-2">
              {{ addOn.description }}
            </p>
            <div class="flex items-center justify-between">
              <div class="flex flex-col">
                <span class="text-lg font-bold">
                  ${{ addOn.price }}
                </span>
                <span class="text-xs text-muted">
                  per
                  {{ addOn.period }}
                  {{ addOn.isMultiple && ' (each)' }}
                </span>
              </div>
              <div class="flex items-center gap-2">
                <div v-if="isInCart(addOn) && addOn.isMultiple" class="flex items-center gap-1 bg-muted rounded-lg p-1">
                  <UButton
                    icon="lucide-minus"
                    size="sm"
                    variant="ghost"
                    class="size-6 p-0"
                    @click="() => updateQuantity(addOn.id, -1)"
                  />
                  <span class="text-sm font-medium w-6 text-center">
                    {{ getCartItem(addOn.id)?.quantity ?? 0 }}
                  </span>
                  <UButton
                    icon="lucide-plus"
                    size="sm"
                    variant="ghost"
                    class="size-6 p-0"
                    :disabled="!canAddMore"
                    @click="() => updateQuantity(addOn.id, 1)"
                  />
                </div>
                <UButton
                  v-if="!isInCart(addOn)"
                  label="Add"
                  icon="lucide-plus"
                  size="sm"
                  variant="subtle"
                  @click="() => addToCart(addOn)"
                />
                <UButton
                  v-if="isInCart(addOn) && !addOn.isMultiple"
                  label="Remove"
                  icon="lucide-x"
                  size="sm"
                  variant="outline"
                  @click="() => removeFromCart(addOn.id)"
                />
                <UButton
                  v-if="isInCart(addOn) && addOn.isMultiple && canAddMore(addOn)"
                  label="More"
                  icon="lucide-plus"
                  size="sm"
                  variant="outline"
                  @click="() => addToCart(addOn)"
                />
              </div>
            </div>
            <div v-if="addOn.maxQuantity && addOn.isMultiple" class="mt-2 text-xs text-muted">
              Max:
              {{ addOn.maxQuantity }}
              {{ addOn.maxQuantity === 1 ? 'unit' : 'units' }}
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        :initial="{ opacity: 0, x: 20 }"
        :animate="{ opacity: 1, x: 0 }"
        class="w-80 flex flex-col p-6 rounded-xl bg-default border border-muted sticky top-6 max-h-[calc(100vh-3rem)]"
      >
        <div class="flex items-center gap-2 mb-4">
          <Icon name="lucide-shopping-cart" class="size-5 text-muted" />
          <h2 class="text-lg font-semibold">
            Cart ({{ totalItems }})
          </h2>
        </div>
        <div class="flex-1 overflow-y-auto space-y-3 min-h-0">
          <AnimatePresence
            :initial="false"
            mode="popLayout"
          >
            <motion.div
              v-if="cart.length === 0"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: 1 }"
              class="text-center py-8 text-muted"
            >
              <Icon name="lucide-shopping-cart" class="size-12 mx-auto mb-3 opacity-50" />
              <p>
                Your cart is empty
              </p>
              <p class="text-sm">
                Add some add-ons to get started
              </p>
            </motion.div>
            <motion.div
              v-for="item in cart"
              :key="item.id"
              layout
              :initial="{ opacity: 0, scale: 0.96 }"
              :animate="{ opacity: 1, scale: 1 }"
              :exit="{ opacity: 0, scale: 0.96 }"
              :transition="{ duration: 0.2 }"
              class="p-4 rounded-lg bg-muted/50 border border-muted/50"
            >
              <div class="flex items-start justify-between mb-2">
                <div class="flex-1 min-w-0">
                  <h4 class="font-medium truncate">
                    {{ item.name }}
                  </h4>
                  <p class="text-xs text-muted">
                    ${{ item.price }}/{{ item.period }}
                  </p>
                </div>
                <UButton
                  icon="lucide-x"
                  size="sm"
                  variant="ghost"
                  class="size-6 p-0 text-muted hover:text-default"
                  @click="() => removeFromCart(item.id)"
                />
              </div>
              <div class="flex items-center justify-between">
                <div v-if="item.isMultiple" class="flex items-center gap-1">
                  <UButton
                    icon="lucide-minus"
                    size="sm"
                    variant="outline"
                    @click="() => updateQuantity(item.id, -1)"
                  />
                  <span class="text-sm font-medium w-8 text-center">
                    {{ item.quantity }}
                  </span>
                  <UButton
                    icon="lucide-plus"
                    size="sm"
                    variant="outline"
                    :disabled="item.maxQuantity ? item.quantity >= item.maxQuantity: false"
                    @click="() => updateQuantity(item.id, 1)"
                  />
                </div>
                <span class="text-sm text-muted">
                  Single use
                </span>
                <span class="text-sm font-semibold">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <motion.div v-if="cart.length > 0" layout class="pt-4 mt-4 border-t border-muted">
          <div class="flex items-center justify-between mb-4">
            <span class="text-lg font-semibold">
              Total
            </span>
            <span class="text-xl font-bold">
              ${{ totalPrice.toFixed(2) }}/month
            </span>
          </div>
          <UButton
            label="Checkout"
            icon="lucide-credit-card"
            variant="subtle"
            class="w-full justify-center"
          />
        </motion.div>
      </motion.div>
    </div>
  </div>
</template>

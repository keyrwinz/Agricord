import config from 'src/config';
const url = config.IS_DEV;
let apiUrl = url + '/';
export default {
  auth: apiUrl + 'authenticate',
  authUser: apiUrl + 'authenticate/user',
  authRefresh: apiUrl + 'authenticate/refresh',
  authInvalidate: apiUrl + 'authenticate/invalidate',
  accountRetrieve: apiUrl + 'accounts/retrieve',
  accountUpdate: apiUrl + 'accounts/update',
  accountCreate: apiUrl + 'accounts/create',
  notificationsRetrieve: apiUrl + 'notifications/retrieve',
  notificationUpdate: apiUrl + 'notifications/update',
  accountProfileCreate: apiUrl + 'account_profiles/create',
  accountProfileUpdate: apiUrl + 'account_profiles/update',
  accountInformationRetrieve: apiUrl + 'account_informations/retrieve',
  accountInformationUpdate: apiUrl + 'account_informations/update',
  emailAlert: apiUrl + 'emails/alert',
  locationCreate: apiUrl + 'locations/create',
  locationRetrieve: apiUrl + 'locations/retrieve',
  locationDelete: apiUrl + 'locations/delete',
  // messenger
  customMessengerGroupCreate: apiUrl + 'custom_messenger_groups/create',
  messengerGroupRetrieve: apiUrl + 'messenger_groups/retrieve',
  messengerGroupRetrieveByParams:
    apiUrl + 'messenger_groups/retrieve_by_params',
  messengerMessagesCreate: apiUrl + 'messenger_messages/create',
  messengerMessagesRetrieve: apiUrl + 'messenger_messages/retrieve',
  messengerMessagesUpdate: apiUrl + 'messenger_messages/update_by_status',
  mmCreateWithImageWithoutPayload:
    apiUrl + 'messenger_messages/create_with_image_without_payload',
  imageUploadUnLink: apiUrl + 'images/upload_un_link',
  // referral
  invitationCreate: apiUrl + 'invitations/create',
  invitationRetrieve: apiUrl + 'invitations/retrieve',
  // images
  imageUpload: apiUrl + 'images/upload',
  imageRetrieve: apiUrl + 'images/retrieve',

  // dashboard result
  dashboardRetrieve: apiUrl + 'order_requests/retrieve_orders_dashboard',
  // carts
  // cartsCreate: apiUrl + 'carts/create',
  // cartsRetrieve: apiUrl + 'carts/retrieve',
  // cartsDelete: apiUrl + 'carts/delete',
  // cartsUpdate: apiUrl + 'carts/update',
  // coupons
  // couponsRetrieve: apiUrl + 'coupons/retrieve',
  // products
  productsRetrieve: apiUrl + 'products/retrieve_basic',
  productsRetrieveWithOrderId: apiUrl + 'products/retrieve_with_order_number',
  // dashboard
  // dashboardRetrieveCategoryList: apiUrl + 'dashboard/categories',
  // dashboardRetrieveFeaturedProducts: apiUrl + 'dashboard/featured',
  // dashboardRetrieveCategoryProducts: apiUrl + 'dashboard/category',
  // dashboardRetrieveShops: apiUrl + 'dashboard/shops_in_array',
  // merchantRetrieve: apiUrl + 'merchants/retrieve',
  // checkout || orders
  // checkoutCreate: apiUrl + 'checkouts/create',
  // ordersRetrieve: apiUrl + 'checkouts/retrieve_orders',
  // orderItemsRetrieve: apiUrl + 'checkout_items/retrieve_on_orders',
  // shippingFee: apiUrl + 'checkouts/get_shipping_fee',
  // notification settings
  notificationSettingsRetrieve: apiUrl + 'notification_settings/retrieve',
  filters: apiUrl + 'dashboard/categories',
  // ratings
  ratingsCreate: apiUrl + 'ratings/create',
  ratingsRetrieve: apiUrl + 'ratings/retrieve',
  // valid-id
  getValidID: apiUrl + 'payloads/get_valid_id',
  uploadValidID: apiUrl + 'payloads/upload_valid_id',
  //Agricord-Tasks
  tasksRetrieve: apiUrl + 'paddocks/retrieve_batches_and_paddocks',
  ordersRetrieve: apiUrl + 'order_requests/retrieve',
  ordersRetrieveMerchant: apiUrl + 'order_requests/retrieve_orders',
  ordersRetrieveByParams: apiUrl + 'order_requests/retrieve_orders_by_params',
  sprayMixesRetrieve: apiUrl + 'spray_mixes/retrieve_details',
  sprayMixOneRetrieve: apiUrl + 'spray_mixes/retrieve',
  sprayMixRetrieveByBatch: apiUrl + 'spray_mixes/retrieve_by_batch',
  orderRequest: apiUrl + 'order_request_items/retrieve',
  paddockDetailsRetrieve: apiUrl + 'paddocks/retrieve',
  paddocksRetrieveWithSprayMix: apiUrl + 'paddocks/retrieve_with_spray_mix',
  // Inventory
  inventoryMerchant: apiUrl + 'products/retrieve_basic',
  inventoryRetrieve: apiUrl + 'transfers/retrieve_products_first_level',
  inventoryEndUser: apiUrl + 'transfers/retrieve_products_first_level_end_user',

  // batches
  batchesRetrieveApplyTasks: apiUrl + 'batches/retrieve_apply_tasks',
  batchesRetrieveUnApplyTask: apiUrl + 'batches/retrieve_unapply_tasks',

  //tasks
  paddockPlanTasksRetrieve: apiUrl + 'paddock_plan_tasks/retrieve_mobile_by_params',
  paddockPlanTasksRetrieveFromBatch: apiUrl + 'paddock_plan_tasks/retrieve_from_batch',
  paddockDueTaskRetrieve: apiUrl + 'paddock_plan_tasks/retrieve_mobile_due_task',
  paddockPlanTasksUpdate: apiUrl + 'paddock_plan_tasks/update',
  paddockPlanTasksRetrieveEndUser: apiUrl + 'paddock_plan_tasks/retrieve_mobile_by_params_end_user',
  paddockPlanTasksRetrieveAvailablePaddocks: apiUrl + 'paddock_plan_tasks/retrieve_available_paddocks',
  paddockPlanTasksCheckIfAvailable: apiUrl + 'paddock_plan_tasks/check_if_available',

  // spray mix products
  sprayMixProductsRetrieve: apiUrl + 'spray_mix_products/retrieve_by_params',
  productTraceRetrieve: apiUrl + 'product_traces/retrieve_by_params',
  batchCreate: apiUrl + 'batches/create',
  batchUpdateStatus: apiUrl + 'batches/update',
  batchRetrieve: apiUrl + 'batches/retrieve',

  updateLastLogin: apiUrl + 'accounts/update_last_log_in',
  productTraceRetrieveUser: apiUrl + 'product_traces/retrieve_by_params_end_user',
};

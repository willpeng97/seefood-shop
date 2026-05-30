import { OrderStatus } from "@prisma/client";

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING_PAYMENT: "待付款",
  PROCESSING: "處理中",
  SHIPPING: "配送中",
  COMPLETED: "已完成",
  CANCELLED: "已取消",
};

export function orderStatusToFilterLabel(
  status: OrderStatus
): "處理中" | "配送中" | "已完成" | null {
  switch (status) {
    case OrderStatus.PROCESSING:
      return "處理中";
    case OrderStatus.SHIPPING:
      return "配送中";
    case OrderStatus.COMPLETED:
      return "已完成";
    default:
      return null;
  }
}

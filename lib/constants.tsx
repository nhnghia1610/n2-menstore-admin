import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Box,
  ShoppingCart,
  UserCircle,
  Archive ,
} from "lucide-react";

export const navLinks = [
  {
    url: "/",
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: "Thống kê",
  },
  {
    url: "/employees",
    icon: <Users className="w-5 h-5" />,
    label: "Nhân viên",
  },
  {
    url: "/collections",
    icon: <FolderOpen className="w-5 h-5" />,
    label: "Bộ sưu tập",
  },
  {
    url: "/categories",
    icon: <Archive className="w-5 h-5" />,
    label: "Danh mục",
  },
  {
    url: "/products",
    icon: <Box className="w-5 h-5" />,
    label: "Sản phẩm",
  },
  {
    url: "/orders",
    icon: <ShoppingCart className="w-5 h-5" />,
    label: "Đơn hàng",
  },
  {
    url: "/customers",
    icon: <UserCircle className="w-5 h-5" />,
    label: "Khách hàng",
  },
];

export const navLinksEmp = [
  {
    url: "/collections",
    icon: <FolderOpen className="w-5 h-5" />,
    label: "Bộ sưu tập",
  },
  {
    url: "/categories",
    icon: <Archive className="w-5 h-5" />,
    label: "Danh mục",
  },
  {
    url: "/products",
    icon: <Box className="w-5 h-5" />,
    label: "Sản phẩm",
  },
  {
    url: "/orders",
    icon: <ShoppingCart className="w-5 h-5" />,
    label: "Đơn hàng",
  },
  {
    url: "/customers",
    icon: <UserCircle className="w-5 h-5" />,
    label: "Khách hàng",
  },
];

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const category_route_1 = require("../modules/category/category.route");
const gear_route_1 = require("../modules/gear/gear.route");
const rental_route_1 = require("../modules/rental/rental.route");
const payment_route_1 = require("../modules/payment/payment.route");
const review_route_1 = require("../modules/review/review.route");
const admin_route_1 = require("../modules/admin/admin.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: "/auth", route: auth_route_1.AuthRoutes },
    { path: "/categories", route: category_route_1.CategoryRoutes },
    { path: "/gear", route: gear_route_1.GearRoutes },
    { path: "/rentals", route: rental_route_1.RentalRoutes },
    { path: "/payments", route: payment_route_1.PaymentRoutes },
    { path: "/reviews", route: review_route_1.ReviewRoutes },
    { path: "/admin", route: admin_route_1.AdminRoutes },
];
moduleRoutes.forEach(({ path, route }) => router.use(path, route));
exports.default = router;

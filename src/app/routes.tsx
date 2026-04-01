import { createBrowserRouter, Navigate } from "react-router";
import { AuthLayout } from "./layouts/AuthLayout";
import { MainLayout } from "./layouts/MainLayout";
import { PhoneFrame } from "./components/PhoneFrame";
import { LoginScreen } from "./screens/auth/LoginScreen";
import { CreateAccountScreen } from "./screens/auth/CreateAccountScreen";
import { ForgotPasswordScreen } from "./screens/auth/ForgotPasswordScreen";
import { HomeScreen } from "./screens/home/HomeScreen";
import { ServersScreen } from "./screens/servers/ServersScreen";
import { SettingsScreen } from "./screens/settings/SettingsScreen";
import { AccountScreen } from "./screens/account/AccountScreen";
import { SubscriptionScreen } from "./screens/subscription/SubscriptionScreen";
import { SetupDevicesScreen } from "./screens/setup/SetupDevicesScreen";
import { RateUsScreen } from "./screens/rate/RateUsScreen";
import { PlanSelectionScreen } from "./screens/payment/PlanSelectionScreen";
import { PaymentMethodScreen } from "./screens/payment/PaymentMethodScreen";
import { PaymentDetailsScreen } from "./screens/payment/PaymentDetailsScreen";
import { CheckoutScreen } from "./screens/payment/CheckoutScreen";
import { PaymentSuccessScreen } from "./screens/payment/PaymentSuccessScreen";
import { GooglePayForm } from "./screens/payment/GooglePayForm";
import { ApplePayForm } from "./screens/payment/ApplePayForm";
import { PaymentErrorScreen } from "./screens/payment/PaymentErrorScreen";
import { ContactSupportScreen } from "./screens/support/ContactSupportScreen";
import { HelpCenterScreen } from "./screens/support/HelpCenterScreen";
import { SplashScreen } from "./screens/splash/SplashScreen";
import { UXMapScreen } from "./screens/flow/UXMapScreen";
import { SplitTunnelingScreen } from "./screens/settings/SplitTunnelingScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/splash" replace />,
  },
  {
    path: "/splash",
    element: (
      <PhoneFrame>
        <SplashScreen />
      </PhoneFrame>
    ),
  },
  {
    path: "/ux-map",
    Component: UXMapScreen,
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: "login", Component: LoginScreen },
      { path: "create-account", Component: CreateAccountScreen },
      { path: "forgot-password", Component: ForgotPasswordScreen },
    ],
  },
  {
    path: "/main",
    Component: MainLayout,
    children: [
      { index: true, element: <Navigate to="/main/home" replace /> },
      { path: "home", Component: HomeScreen },
      { path: "servers", Component: ServersScreen },
      { path: "settings", Component: SettingsScreen },
      { path: "account", Component: AccountScreen },
      { path: "subscription", Component: SubscriptionScreen },
      { path: "setup-devices", Component: SetupDevicesScreen },
      { path: "rate-us", Component: RateUsScreen },
      { path: "plan-selection", Component: PlanSelectionScreen },
      { path: "payment-method", Component: PaymentMethodScreen },
      { path: "payment-details", Component: PaymentDetailsScreen },
      { path: "payment-checkout", Component: CheckoutScreen },
      { path: "payment-success", Component: PaymentSuccessScreen },
      { path: "google-pay-processing", Component: GooglePayForm },
      { path: "apple-pay-processing", Component: ApplePayForm },
      { path: "payment-error", Component: PaymentErrorScreen },
      { path: "contact-support", Component: ContactSupportScreen },
      { path: "help-center", Component: HelpCenterScreen },
      { path: "split-tunneling", Component: SplitTunnelingScreen },
    ],
  },
]);
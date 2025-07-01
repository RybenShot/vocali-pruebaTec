
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'MenuLateral': typeof import("../components/menuLateral.vue")['default']
    'Navegacion': typeof import("../components/navegacion.vue")['default']
    'PiePagina': typeof import("../components/piePagina.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
    'NuxtPicture': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
    'Icon': typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']
    'SignIn': typeof import("@clerk/vue")['SignIn']
    'SignUp': typeof import("@clerk/vue")['SignUp']
    'SignInButton': typeof import("@clerk/vue")['SignInButton']
    'SignOutButton': typeof import("@clerk/vue")['SignOutButton']
    'SignUpButton': typeof import("@clerk/vue")['SignUpButton']
    'SignInWithMetamaskButton': typeof import("@clerk/vue")['SignInWithMetamaskButton']
    'UserButton': typeof import("@clerk/vue")['UserButton']
    'UserProfile': typeof import("@clerk/vue")['UserProfile']
    'CreateOrganization': typeof import("@clerk/vue")['CreateOrganization']
    'OrganizationProfile': typeof import("@clerk/vue")['OrganizationProfile']
    'OrganizationSwitcher': typeof import("@clerk/vue")['OrganizationSwitcher']
    'OrganizationList': typeof import("@clerk/vue")['OrganizationList']
    'ClerkLoaded': typeof import("@clerk/vue")['ClerkLoaded']
    'ClerkLoading': typeof import("@clerk/vue")['ClerkLoading']
    'Protect': typeof import("@clerk/vue")['Protect']
    'RedirectToSignIn': typeof import("@clerk/vue")['RedirectToSignIn']
    'RedirectToSignUp': typeof import("@clerk/vue")['RedirectToSignUp']
    'RedirectToUserProfile': typeof import("@clerk/vue")['RedirectToUserProfile']
    'RedirectToOrganizationProfile': typeof import("@clerk/vue")['RedirectToOrganizationProfile']
    'RedirectToCreateOrganization': typeof import("@clerk/vue")['RedirectToCreateOrganization']
    'SignedIn': typeof import("@clerk/vue")['SignedIn']
    'SignedOut': typeof import("@clerk/vue")['SignedOut']
    'Waitlist': typeof import("@clerk/vue")['Waitlist']
    'PricingTable': typeof import("@clerk/vue")['PricingTable']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyMenuLateral': LazyComponent<typeof import("../components/menuLateral.vue")['default']>
    'LazyNavegacion': LazyComponent<typeof import("../components/navegacion.vue")['default']>
    'LazyPiePagina': LazyComponent<typeof import("../components/piePagina.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
    'LazyIcon': LazyComponent<typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']>
    'LazySignIn': LazyComponent<typeof import("@clerk/vue")['SignIn']>
    'LazySignUp': LazyComponent<typeof import("@clerk/vue")['SignUp']>
    'LazySignInButton': LazyComponent<typeof import("@clerk/vue")['SignInButton']>
    'LazySignOutButton': LazyComponent<typeof import("@clerk/vue")['SignOutButton']>
    'LazySignUpButton': LazyComponent<typeof import("@clerk/vue")['SignUpButton']>
    'LazySignInWithMetamaskButton': LazyComponent<typeof import("@clerk/vue")['SignInWithMetamaskButton']>
    'LazyUserButton': LazyComponent<typeof import("@clerk/vue")['UserButton']>
    'LazyUserProfile': LazyComponent<typeof import("@clerk/vue")['UserProfile']>
    'LazyCreateOrganization': LazyComponent<typeof import("@clerk/vue")['CreateOrganization']>
    'LazyOrganizationProfile': LazyComponent<typeof import("@clerk/vue")['OrganizationProfile']>
    'LazyOrganizationSwitcher': LazyComponent<typeof import("@clerk/vue")['OrganizationSwitcher']>
    'LazyOrganizationList': LazyComponent<typeof import("@clerk/vue")['OrganizationList']>
    'LazyClerkLoaded': LazyComponent<typeof import("@clerk/vue")['ClerkLoaded']>
    'LazyClerkLoading': LazyComponent<typeof import("@clerk/vue")['ClerkLoading']>
    'LazyProtect': LazyComponent<typeof import("@clerk/vue")['Protect']>
    'LazyRedirectToSignIn': LazyComponent<typeof import("@clerk/vue")['RedirectToSignIn']>
    'LazyRedirectToSignUp': LazyComponent<typeof import("@clerk/vue")['RedirectToSignUp']>
    'LazyRedirectToUserProfile': LazyComponent<typeof import("@clerk/vue")['RedirectToUserProfile']>
    'LazyRedirectToOrganizationProfile': LazyComponent<typeof import("@clerk/vue")['RedirectToOrganizationProfile']>
    'LazyRedirectToCreateOrganization': LazyComponent<typeof import("@clerk/vue")['RedirectToCreateOrganization']>
    'LazySignedIn': LazyComponent<typeof import("@clerk/vue")['SignedIn']>
    'LazySignedOut': LazyComponent<typeof import("@clerk/vue")['SignedOut']>
    'LazyWaitlist': LazyComponent<typeof import("@clerk/vue")['Waitlist']>
    'LazyPricingTable': LazyComponent<typeof import("@clerk/vue")['PricingTable']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const MenuLateral: typeof import("../components/menuLateral.vue")['default']
export const Navegacion: typeof import("../components/navegacion.vue")['default']
export const PiePagina: typeof import("../components/piePagina.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const Icon: typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']
export const SignIn: typeof import("@clerk/vue")['SignIn']
export const SignUp: typeof import("@clerk/vue")['SignUp']
export const SignInButton: typeof import("@clerk/vue")['SignInButton']
export const SignOutButton: typeof import("@clerk/vue")['SignOutButton']
export const SignUpButton: typeof import("@clerk/vue")['SignUpButton']
export const SignInWithMetamaskButton: typeof import("@clerk/vue")['SignInWithMetamaskButton']
export const UserButton: typeof import("@clerk/vue")['UserButton']
export const UserProfile: typeof import("@clerk/vue")['UserProfile']
export const CreateOrganization: typeof import("@clerk/vue")['CreateOrganization']
export const OrganizationProfile: typeof import("@clerk/vue")['OrganizationProfile']
export const OrganizationSwitcher: typeof import("@clerk/vue")['OrganizationSwitcher']
export const OrganizationList: typeof import("@clerk/vue")['OrganizationList']
export const ClerkLoaded: typeof import("@clerk/vue")['ClerkLoaded']
export const ClerkLoading: typeof import("@clerk/vue")['ClerkLoading']
export const Protect: typeof import("@clerk/vue")['Protect']
export const RedirectToSignIn: typeof import("@clerk/vue")['RedirectToSignIn']
export const RedirectToSignUp: typeof import("@clerk/vue")['RedirectToSignUp']
export const RedirectToUserProfile: typeof import("@clerk/vue")['RedirectToUserProfile']
export const RedirectToOrganizationProfile: typeof import("@clerk/vue")['RedirectToOrganizationProfile']
export const RedirectToCreateOrganization: typeof import("@clerk/vue")['RedirectToCreateOrganization']
export const SignedIn: typeof import("@clerk/vue")['SignedIn']
export const SignedOut: typeof import("@clerk/vue")['SignedOut']
export const Waitlist: typeof import("@clerk/vue")['Waitlist']
export const PricingTable: typeof import("@clerk/vue")['PricingTable']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyMenuLateral: LazyComponent<typeof import("../components/menuLateral.vue")['default']>
export const LazyNavegacion: LazyComponent<typeof import("../components/navegacion.vue")['default']>
export const LazyPiePagina: LazyComponent<typeof import("../components/piePagina.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyIcon: LazyComponent<typeof import("../node_modules/@nuxt/icon/dist/runtime/components/index")['default']>
export const LazySignIn: LazyComponent<typeof import("@clerk/vue")['SignIn']>
export const LazySignUp: LazyComponent<typeof import("@clerk/vue")['SignUp']>
export const LazySignInButton: LazyComponent<typeof import("@clerk/vue")['SignInButton']>
export const LazySignOutButton: LazyComponent<typeof import("@clerk/vue")['SignOutButton']>
export const LazySignUpButton: LazyComponent<typeof import("@clerk/vue")['SignUpButton']>
export const LazySignInWithMetamaskButton: LazyComponent<typeof import("@clerk/vue")['SignInWithMetamaskButton']>
export const LazyUserButton: LazyComponent<typeof import("@clerk/vue")['UserButton']>
export const LazyUserProfile: LazyComponent<typeof import("@clerk/vue")['UserProfile']>
export const LazyCreateOrganization: LazyComponent<typeof import("@clerk/vue")['CreateOrganization']>
export const LazyOrganizationProfile: LazyComponent<typeof import("@clerk/vue")['OrganizationProfile']>
export const LazyOrganizationSwitcher: LazyComponent<typeof import("@clerk/vue")['OrganizationSwitcher']>
export const LazyOrganizationList: LazyComponent<typeof import("@clerk/vue")['OrganizationList']>
export const LazyClerkLoaded: LazyComponent<typeof import("@clerk/vue")['ClerkLoaded']>
export const LazyClerkLoading: LazyComponent<typeof import("@clerk/vue")['ClerkLoading']>
export const LazyProtect: LazyComponent<typeof import("@clerk/vue")['Protect']>
export const LazyRedirectToSignIn: LazyComponent<typeof import("@clerk/vue")['RedirectToSignIn']>
export const LazyRedirectToSignUp: LazyComponent<typeof import("@clerk/vue")['RedirectToSignUp']>
export const LazyRedirectToUserProfile: LazyComponent<typeof import("@clerk/vue")['RedirectToUserProfile']>
export const LazyRedirectToOrganizationProfile: LazyComponent<typeof import("@clerk/vue")['RedirectToOrganizationProfile']>
export const LazyRedirectToCreateOrganization: LazyComponent<typeof import("@clerk/vue")['RedirectToCreateOrganization']>
export const LazySignedIn: LazyComponent<typeof import("@clerk/vue")['SignedIn']>
export const LazySignedOut: LazyComponent<typeof import("@clerk/vue")['SignedOut']>
export const LazyWaitlist: LazyComponent<typeof import("@clerk/vue")['Waitlist']>
export const LazyPricingTable: LazyComponent<typeof import("@clerk/vue")['PricingTable']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]

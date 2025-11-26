package com.oskarpointstracker

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {
    override val reactNativeHost: ReactNativeHost = object : DefaultReactNativeHost(this) {
        override fun getPackages(): MutableList<ReactPackage> = PackageList(this).packages
        override fun getJSMainModuleName(): String = "index"
        override fun isNewArchEnabled(): Boolean = false
        override fun isHermesEnabled(): Boolean = true
    }

    override fun getReactNativeHost(): ReactNativeHost = reactNativeHost

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
        if (reactNativeHost.isNewArchEnabled) {
            DefaultNewArchitectureEntryPoint.load()
        }
    }
}

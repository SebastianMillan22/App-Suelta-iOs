package com.suelta_app;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.webkit.PermissionRequest;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebChromeClient;
import com.getcapacitor.BridgeWebViewClient;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends BridgeActivity {
    private static final int PERMISSION_REQ_CODE = 1001;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(GoogleAuth.class);
        super.onCreate(savedInstanceState);
        solicitarPermisosSistema();
    }

    @Override
    public void onResume() {
        super.onResume();
        configurarPermisosWebView();
    }

    private void solicitarPermisosSistema() {
        try {
            List<String> permisosFaltantes = new ArrayList<>();
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
                permisosFaltantes.add(Manifest.permission.RECORD_AUDIO);
            }
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                permisosFaltantes.add(Manifest.permission.CAMERA);
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                    permisosFaltantes.add(Manifest.permission.POST_NOTIFICATIONS);
                }
            }
            if (!permisosFaltantes.isEmpty()) {
                ActivityCompat.requestPermissions(this, permisosFaltantes.toArray(new String[0]), PERMISSION_REQ_CODE);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void configurarPermisosWebView() {
        try {
            if (getBridge() != null && getBridge().getWebView() != null) {
                WebView webView = getBridge().getWebView();
                webView.setWebChromeClient(new BridgeWebChromeClient(getBridge()) {
                    @Override
                    public void onPermissionRequest(final PermissionRequest request) {
                        runOnUiThread(() -> {
                            try {
                                request.grant(request.getResources());
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        });
                    }
                });

                webView.setWebViewClient(new BridgeWebViewClient(getBridge()) {
                    @Override
                    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                        if (request != null && request.getUrl() != null) {
                            String url = request.getUrl().toString();
                            if (url.startsWith("intent:") || url.startsWith("app-settings:") || url.startsWith("package:")) {
                                try {
                                    Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                                    intent.setData(Uri.fromParts("package", getPackageName(), null));
                                    startActivity(intent);
                                    return true;
                                } catch (Exception e) {
                                    return true;
                                }
                            }
                        }
                        return super.shouldOverrideUrlLoading(view, request);
                    }
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

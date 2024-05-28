package com.WS.tools;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

  private WebView mWebView;
  // private ValueCallback<Uri[]> fileUploadCallback;

  @Override
  @SuppressLint("SetJavaScriptEnabled")
  protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    mWebView = findViewById(R.id.activity_main_webview);
    WebSettings webSettings = mWebView.getSettings();
    webSettings.setJavaScriptEnabled(true);
    mWebView.setWebViewClient(new WebViewClient());
    // mWebView.setWebChromeClient(new MyWebChromeClient());
    mWebView.loadUrl("file:///android_asset/CPS.html");
  }

//  private class MyWebChromeClient extends WebChromeClient {
//    @Override
//    public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
//      fileUploadCallback = filePathCallback;
//      Intent intent = fileChooserParams.createIntent();
//      try {
//        startActivityForResult(intent, 1);
//      } catch (Exception e) {
//        fileUploadCallback = null;
//        return false;
//      }
//      return true;
//    }
//  }
//
//  @Override
//  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
//    super.onActivityResult(requestCode, resultCode, data);
//    if (requestCode == 1) {
//      if (fileUploadCallback == null) {
//        return;
//      }
//      Uri[] results = null;
//      if (resultCode == RESULT_OK && data != null) {
//        String dataString = data.getDataString();
//        if (dataString != null) {
//          results = new Uri[]{Uri.parse(dataString)};
//        }
//      }
//      fileUploadCallback.onReceiveValue(results);
//      fileUploadCallback = null;
//    }
//  }

  @Override
  public void onBackPressed() {
    if (mWebView.canGoBack()) {
      mWebView.goBack();
    } else {
      super.onBackPressed();
    }
  }
}

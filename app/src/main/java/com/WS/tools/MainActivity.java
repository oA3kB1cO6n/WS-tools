package com.WS.tools;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.DownloadManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.webkit.DownloadListener;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import com.WS.tools.MimeTypes;

public class MainActivity extends Activity {

  private WebView mWebView;
  private ValueCallback<Uri[]> fileUploadCallback;

  @Override
  @SuppressLint("SetJavaScriptEnabled")
  protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    mWebView = findViewById(R.id.activity_main_webview);
    WebSettings webSettings = mWebView.getSettings();
    webSettings.setJavaScriptEnabled(true);
    mWebView.setWebViewClient(new WebViewClient());
    mWebView.setWebChromeClient(new MyWebChromeClient());
	mWebView.setDownloadListener(new DownloadListener() {
	  public void onDownloadStart(String url, String userAgent,
									String contentDisposition, String mimetype,
									long contentLength) {
		DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));

	    String extension = MimeTypes.getSub(mimetype);
	    String fileName = getContent(getContent(url, "/", true), ".", false) + extension;
		request.setDescription(fileName);
		request.setTitle("下载文件…");

		request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, fileName);

		DownloadManager downloadManager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
		downloadManager.enqueue(request);
	  }
	});
    mWebView.loadUrl("file:///android_asset/CPS.html");
  }

  private class MyWebChromeClient extends WebChromeClient {
    @Override
    public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
      fileUploadCallback = filePathCallback;
      Intent intent = fileChooserParams.createIntent();
      try {
        startActivityForResult(intent, 1);
      } catch (Exception e) {
        fileUploadCallback = null;
        return false;
      }
      return true;
    }
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (requestCode == 1) {
      if (fileUploadCallback == null) {
        return;
      }
      Uri[] results = null;
      if (resultCode == RESULT_OK && data != null) {
        String dataString = data.getDataString();
        if (dataString != null) {
          results = new Uri[]{Uri.parse(dataString)};
        }
      }
      fileUploadCallback.onReceiveValue(results);
      fileUploadCallback = null;
    }
  }

  @Override
  public void onBackPressed() {
    if (mWebView.canGoBack()) {
      mWebView.goBack();
    } else {
      super.onBackPressed();
    }
  }

  private String getContent(String str, String str2, boolean after) {
	int lastIndex = str.lastIndexOf(str2);

	if (lastIndex != -1) {
	  if (after) {
		return str.substring(lastIndex + 1);
	  } else {
		return str.substring(0, lastIndex);
	  }
	} else {
	  return str;
	}
  }
}

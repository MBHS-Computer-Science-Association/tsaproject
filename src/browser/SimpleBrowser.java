package webkit.test;

import javafx.application.Application;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;

public class SimpleBrowser extends Application {

	private Scene scene;
	private BorderPane borderPane;
	private Button searchButton;
	private TextField searchField;
	private WebView webView;
	private WebEngine webEngine;

	@Override
	public void start(Stage stage) throws Exception {

		// Add search button and give it an event handler
		searchButton = new Button("->");
		searchButton.setMaxWidth(200);
		searchButton.setOnAction(event -> {
			webEngine.load("http://" + searchField.getText());
			System.out.println("search field entry: " + searchField.getText());
		});

		// Add entry field w/ label
		searchField = new TextField();
		searchField.setPrefWidth(800);
		searchField.setOnAction(event -> webEngine.load("http://" + searchField.getText()));

		// Creating horizontal box
		final HBox hBox = new HBox();
		hBox.setAlignment(Pos.CENTER);
		hBox.setSpacing(5);
		hBox.getChildren().addAll(searchField, searchButton);

		// Creating vertical box
		final VBox vBox = new VBox();
		vBox.setAlignment(Pos.CENTER);
		vBox.getChildren().addAll(hBox);
		vBox.setSpacing(10);

		// Add default webpage in WebView
		webView = new WebView();
		webEngine = webView.getEngine();
		webEngine.setJavaScriptEnabled(true);
		webEngine.load("http://porscheusa.com");

		// Setting default size of browser window
		borderPane = new BorderPane();
		borderPane.setPrefSize(1280, 960);

		// Add all nodes to border pane
		borderPane.setTop(vBox);
		borderPane.setCenter(webView);

		scene = new Scene(borderPane);

		stage.setTitle("Better than Internet Explorer");
		stage.setScene(scene);
		stage.show();
	}

	public static void main(String[] args) {
		launch(args);
	}
}

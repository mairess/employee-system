package org.maires.password.docs;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Configuration;

/**
 * The type Open api config.
 */
@Configuration
public class OpenApiConfig implements OpenApiCustomizer {

  @Override
  public void customise(OpenAPI openApi) {
    Info info = new Info()
        .title("Employee System")
        .description("A RESTful API for managing employee data.")
        .version("1.0.0");

    openApi.info(info);
  }
}
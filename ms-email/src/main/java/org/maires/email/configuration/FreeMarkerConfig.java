package org.maires.email.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

/**
 * The type Free marker config.
 */
@Configuration
public class FreeMarkerConfig {

  /**
   * Freemarker config free marker configuration factory bean.
   *
   * @return the free marker configuration factory bean
   */
  @Bean
  public FreeMarkerConfigurationFactoryBean freemarkerConfig() {
    FreeMarkerConfigurationFactoryBean factoryBean = new FreeMarkerConfigurationFactoryBean();
    factoryBean.setTemplateLoaderPath("classpath:/templates/");
    return factoryBean;
  }
}
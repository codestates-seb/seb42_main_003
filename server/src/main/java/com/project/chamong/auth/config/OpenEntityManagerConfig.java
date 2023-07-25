package com.project.chamong.auth.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter;

//@Configuration
public class OpenEntityManagerConfig {
  
//  @Bean
  public FilterRegistrationBean<OpenEntityManagerInViewFilter> registerOpenEntityManagerInViewFilter(){
    FilterRegistrationBean<OpenEntityManagerInViewFilter> filterFilterRegistrationBean = new FilterRegistrationBean<>();
    filterFilterRegistrationBean.setFilter(new OpenEntityManagerInViewFilter());
    filterFilterRegistrationBean.setOrder(Integer.MIN_VALUE);
    return filterFilterRegistrationBean;
  }
}

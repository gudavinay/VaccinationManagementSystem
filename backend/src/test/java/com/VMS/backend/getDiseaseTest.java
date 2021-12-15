package com.VMS.backend;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

@RunWith(SpringRunner.class)
public class getDiseaseTest {
    @Test
    public void ordertest1() throws Exception{
        RestTemplate restTemplate = new RestTemplate();
        final String baseUrl = "http://localhost:8181/disease/6";
        URI uri = new URI(baseUrl);
        ResponseEntity<?> response = restTemplate.getForEntity(uri, String.class);
        Assert.assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    public void ordertest2() throws Exception{
        RestTemplate restTemplate = new RestTemplate();
        final String baseUrl = "http://localhost:8181/disease/5";
        URI uri = new URI(baseUrl);
        ResponseEntity<?> response = restTemplate.getForEntity(uri, String.class);
        Assert.assertEquals(200, response.getStatusCodeValue());
    }
}

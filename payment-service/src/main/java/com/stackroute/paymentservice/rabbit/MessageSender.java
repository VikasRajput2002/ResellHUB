package com.stackroute.paymentservice.rabbit;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
public class MessageSender {
	 @Autowired
	    private RabbitTemplate rabbitTemplate;

	    private final String exchange;
	    private final String routingKey;

	    public MessageSender(
	            @Value("${rabbitmq.exchange}") String exchange,
	            @Value("${rabbitmq.routingKey}") String routingKey) {
	        this.exchange = exchange;
	        this.routingKey = routingKey;
	    }

	    public void sendMessage(Object message) {
	        rabbitTemplate.convertAndSend(exchange, routingKey, message);
	    }
}


   
package com.stackroute.paymentservice.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.stackroute.paymentservice.model.Payment;
import com.stackroute.paymentservice.model.TransactionDetails;
import com.stackroute.paymentservice.repo.PaymentRepository;
@Service
public class PaymentService {
//	private static final String KEY ="rzp_test_GLUFBJzyJlehw5";
//	private static final String KEY_SECRET ="NB8vrvDr7coHrPxhmejj1vvr";
//	private static final String CURRENCY ="INR";
	private static final String KEY ="rzp_test_ZcT1ZbnQaSm5qZ";
	private static final String KEY_SECRET ="XrJRheBf9o99gmKZtWBSzO27";
	private static final String CURRENCY ="INR";
	
	@Autowired
	private PaymentRepository paymentRepository;
	
	public TransactionDetails createTransaction(Double amount) {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("amount", (amount*100));
		jsonObject.put("currency", CURRENCY);
		

		try {
			RazorpayClient razorpayClient =new RazorpayClient(KEY, KEY_SECRET);
			Order order = razorpayClient.orders.create(jsonObject);
			return prepareTransactionDetails(order);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
		}
		return null;
	}
	
	private TransactionDetails prepareTransactionDetails(Order order) {
		String orderId =order.get("id");
		String currency =order.get("currency");
		Integer amount =order.get("amount");
		
		TransactionDetails transactiondetails =new TransactionDetails(orderId, currency, amount, KEY);
		return transactiondetails;
	}
	
	public Payment addPayment(Payment payment) {
        return paymentRepository.save(payment);
    }
	


}

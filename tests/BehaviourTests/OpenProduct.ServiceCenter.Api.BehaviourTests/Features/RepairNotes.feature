Feature: RepairNotes Ticket-Number
	 As a service center employee to to support clients I need to interact with repair notes

@ViewRepairNotes
Scenario: Retrieve a list of the most recent repair notes
	Given A connection to the service center API
	When I make a get request to the Repair Notes Controller
	Given I have no arguments
	Then the API should return a list of the most recent existing repair notes
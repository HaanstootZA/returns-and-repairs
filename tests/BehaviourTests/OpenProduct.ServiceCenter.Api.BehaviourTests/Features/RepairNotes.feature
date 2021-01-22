Feature: RepairNotes
	 As a service center employee to to support clients I need to interact with repair notes

@ViewRepairNotes
Scenario: Retrieve a list of the most recent repair notes
	Given A connection to the service center API
	When I make a GET request to the Repair Notes Controller
	Then the API should return a list of existing repair notes
class MathRepository:
    def __init__(self):
        self.operations = []

    def save_operation(self, operation):
        self.operations.append(operation)

    def get_operations(self):
        return self.operations